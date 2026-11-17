import sql from 'mssql';
import { execFile } from 'child_process';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const SCRIPT_PATH = path.join(process.cwd(), 'scripts', 'sql_runner.ps1');
const TEMP_DIR = path.join(process.cwd(), '.next', 'cache', 'sql_queries');

if (!fs.existsSync(TEMP_DIR)) {
  try {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  } catch {}
}

let mssqlPool: sql.ConnectionPool | null = null;

const CLOUD_CONFIG: sql.config = {
  user: process.env.DB_USER || 'db80779',
  password: process.env.DB_PASSWORD || '5Yo@Xi=2#6qM',
  server: process.env.DB_SERVER || 'db80779.public.databaseasp.net',
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'db80779',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  connectionTimeout: 20000,
  requestTimeout: 25000,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

async function getMssqlPool(): Promise<sql.ConnectionPool> {
  if (mssqlPool && mssqlPool.connected) {
    return mssqlPool;
  }
  try {
    const connStr = process.env.DATABASE_URL || process.env.MSSQL_CONNECTION_STRING;
    if (connStr) {
      mssqlPool = await sql.connect(connStr);
    } else {
      mssqlPool = await sql.connect(CLOUD_CONFIG);
    }
    return mssqlPool;
  } catch (err: any) {
    mssqlPool = null;
    throw err;
  }
}

function sanitizeJsonString(raw: string): string {
  let inString = false;
  let escaped = false;
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    const code = ch.charCodeAt(0);
    if (inString) {
      if (escaped) {
        result += ch;
        escaped = false;
      } else if (ch === '\\') {
        result += ch;
        escaped = true;
      } else if (ch === '"') {
        result += ch;
        inString = false;
      } else if (code < 32) {
        if (code === 10) result += '\\n';
        else if (code === 13) result += '\\r';
        else if (code === 9) result += '\\t';
        else if (code === 8) result += '\\b';
        else if (code === 12) result += '\\f';
        else result += '\\u' + code.toString(16).padStart(4, '0');
      } else {
        result += ch;
      }
    } else {
      if (ch === '"') {
        inString = true;
      }
      result += ch;
    }
  }
  return result;
}

function safeJsonParse<T = any>(str: string): T {
  try {
    return JSON.parse(str);
  } catch {
    try {
      const sanitized = sanitizeJsonString(str);
      return JSON.parse(sanitized);
    } catch {
      // Fallback for edge cases: strip non-printable ascii
      const cleaned = str.replace(/[\x00-\x1F\x7F-\x9F]/g, ' ');
      return JSON.parse(cleaned);
    }
  }
}

async function runSqlLocal<T = any>(sqlQuery: string): Promise<T[]> {
  const tempFile = path.join(TEMP_DIR, `q_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.sql`);
  try {
    fs.writeFileSync(tempFile, sqlQuery, 'utf8');
    const { stdout, stderr } = await execFileAsync('powershell', [
      '-ExecutionPolicy', 'Bypass',
      '-NoProfile',
      '-File', SCRIPT_PATH,
      '-QueryFile', tempFile,
    ], {
      timeout: 25000,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (stderr && stderr.trim().length > 0 && !stdout) {
      throw new Error(stderr);
    }

    const trimmed = stdout.trim();
    if (!trimmed || trimmed === '[]') return [] as T[];
    const parsed = safeJsonParse<T>(trimmed);
    return (Array.isArray(parsed) ? parsed : [parsed]) as T[];
  } catch (err: any) {
    console.error('SQL Execution Error (Local):', err.message || err);
    throw err;
  } finally {
    try {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    } catch {}
  }
}

export async function runSql<T = any>(sqlQuery: string): Promise<T[]> {
  try {
    const pool = await getMssqlPool();
    const result = await pool.request().query(sqlQuery);
    return (result.recordset || []) as T[];
  } catch (err: any) {
    if (process.platform === 'win32' && !process.env.VERCEL) {
      console.warn('Cloud MSSQL connection error, falling back to local runner:', err.message || err);
      return runSqlLocal<T>(sqlQuery);
    }
    throw err;
  }
}

// ----------------- Categories -----------------
export async function getCategories() {
  return await runSql('EXEC sp_GetCategories');
}

export async function upsertCategory(cat: {
  id: string;
  slug: string;
  name: string;
  shortTitle?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  displayOrder?: number;
  isActive?: boolean;
}) {
  const sql = `
    EXEC sp_UpsertCategory
      @Id = N'${escapeSql(cat.id)}',
      @Slug = N'${escapeSql(cat.slug)}',
      @Name = N'${escapeSql(cat.name)}',
      @ShortTitle = ${cat.shortTitle ? `N'${escapeSql(cat.shortTitle)}'` : 'NULL'},
      @Subtitle = ${cat.subtitle ? `N'${escapeSql(cat.subtitle)}'` : 'NULL'},
      @Description = ${cat.description ? `N'${escapeSql(cat.description)}'` : 'NULL'},
      @ImageUrl = ${cat.imageUrl ? `N'${escapeSql(cat.imageUrl)}'` : 'NULL'},
      @Badge = ${cat.badge ? `N'${escapeSql(cat.badge)}'` : 'NULL'},
      @DisplayOrder = ${cat.displayOrder ?? 1},
      @IsActive = ${cat.isActive === false ? 0 : 1};
  `;
  await runSql(sql);
  return { success: true };
}

export async function deleteCategory(id: string) {
  await runSql(`EXEC sp_DeleteCategory @Id = N'${escapeSql(id)}';`);
  return { success: true };
}

// ----------------- Catalog Works -----------------
export async function getCatalogWorks(categoryId?: string, onlyActive: boolean = false) {
  const param = categoryId ? `@CategoryId = N'${escapeSql(categoryId)}', ` : '';
  const sql = `EXEC sp_GetCatalogWorks ${param}@OnlyActive = ${onlyActive ? 1 : 0};`;
  return await runSql(sql);
}

export async function getWorkById(id: string) {
  const rows = await runSql(`EXEC sp_GetWorkById @Id = N'${escapeSql(id)}';`);
  return rows[0] || null;
}

export async function upsertCatalogWork(work: {
  id: string;
  categoryId: string;
  title: string;
  slug?: string;
  price?: string;
  priceNumber?: number;
  description?: string;
  badge?: string;
  coverImage: string;
  workOrder?: number;
  tags?: string;
  isSignature?: boolean;
  isActive?: boolean;
}) {
  const slug = work.slug || work.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sql = `
    EXEC sp_UpsertCatalogWork
      @Id = N'${escapeSql(work.id)}',
      @CategoryId = N'${escapeSql(work.categoryId)}',
      @Title = N'${escapeSql(work.title)}',
      @Slug = N'${escapeSql(slug)}',
      @Price = ${work.price ? `N'${escapeSql(work.price)}'` : 'NULL'},
      @PriceNumber = ${work.priceNumber !== undefined ? work.priceNumber : 'NULL'},
      @Description = ${work.description ? `N'${escapeSql(work.description)}'` : 'NULL'},
      @Badge = ${work.badge ? `N'${escapeSql(work.badge)}'` : 'NULL'},
      @CoverImage = N'${escapeSql(work.coverImage)}',
      @WorkOrder = ${work.workOrder ?? 1},
      @Tags = ${work.tags ? `N'${escapeSql(work.tags)}'` : 'NULL'},
      @IsSignature = ${work.isSignature ? 1 : 0},
      @IsActive = ${work.isActive === false ? 0 : 1};
  `;
  await runSql(sql);
  return { success: true };
}

export async function deleteCatalogWork(id: string) {
  await runSql(`EXEC sp_DeleteCatalogWork @Id = N'${escapeSql(id)}';`);
  return { success: true };
}

// ----------------- Work Media (5 Photos + 1 Video) -----------------
export async function getWorkMediaByWorkId(workId: string) {
  return await runSql(`EXEC sp_GetWorkMediaByWorkId @WorkId = N'${escapeSql(workId)}';`);
}

export async function replaceWorkMedia(
  workId: string,
  mediaItems: { mediaType: 'image' | 'video'; mediaUrl: string; displayOrder?: number }[]
) {
  await runSql(`EXEC sp_DeleteWorkMediaByWorkId @WorkId = N'${escapeSql(workId)}';`);
  for (let i = 0; i < mediaItems.length; i++) {
    const item = mediaItems[i];
    if (!item.mediaUrl) continue;
    const order = item.displayOrder ?? (i + 1);
    await runSql(`
      EXEC sp_AddWorkMedia
        @WorkId = N'${escapeSql(workId)}',
        @MediaType = N'${escapeSql(item.mediaType)}',
        @MediaUrl = N'${escapeSql(item.mediaUrl)}',
        @DisplayOrder = ${order};
    `);
  }
  return { success: true };
}

// ----------------- Instagram Reels -----------------
export async function getInstagramReels(onlyActive: boolean = false) {
  return await runSql(`EXEC sp_GetInstagramReels @OnlyActive = ${onlyActive ? 1 : 0};`);
}

export async function upsertInstagramReel(reel: {
  id: string;
  title: string;
  caption?: string;
  videoUrl?: string;
  posterUrl: string;
  duration?: string;
  instagramUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}) {
  const sql = `
    EXEC sp_UpsertInstagramReel
      @Id = N'${escapeSql(reel.id)}',
      @Title = N'${escapeSql(reel.title)}',
      @Caption = ${reel.caption ? `N'${escapeSql(reel.caption)}'` : 'NULL'},
      @VideoUrl = ${reel.videoUrl ? `N'${escapeSql(reel.videoUrl)}'` : 'NULL'},
      @PosterUrl = N'${escapeSql(reel.posterUrl)}',
      @Duration = ${reel.duration ? `N'${escapeSql(reel.duration)}'` : 'NULL'},
      @InstagramUrl = ${reel.instagramUrl ? `N'${escapeSql(reel.instagramUrl)}'` : 'NULL'},
      @DisplayOrder = ${reel.displayOrder ?? 1},
      @IsActive = ${reel.isActive === false ? 0 : 1};
  `;
  await runSql(sql);
  return { success: true };
}

export async function deleteInstagramReel(id: string) {
  await runSql(`EXEC sp_DeleteInstagramReel @Id = N'${escapeSql(id)}';`);
  return { success: true };
}

// ----------------- Customer Reviews -----------------
export async function getCustomerReviews(onlyApproved?: boolean) {
  return await runSql('EXEC sp_GetCustomerReviews;');
}

export async function upsertCustomerReview(rev: {
  id: string;
  author: string;
  city?: string;
  occasion?: string;
  rating?: number;
  reviewText: string;
  photoUrl?: string;
  isVerified?: boolean;
  displayOrder?: number;
}) {
  const sql = `
    EXEC sp_UpsertCustomerReview
      @Id = N'${escapeSql(rev.id)}',
      @Author = N'${escapeSql(rev.author)}',
      @Occasion = ${rev.occasion ? `N'${escapeSql(rev.occasion)}'` : 'NULL'},
      @City = ${rev.city ? `N'${escapeSql(rev.city)}'` : 'NULL'},
      @Rating = ${rev.rating ?? 5},
      @ReviewText = N'${escapeSql(rev.reviewText)}',
      @PhotoUrl = ${rev.photoUrl ? `N'${escapeSql(rev.photoUrl)}'` : 'NULL'},
      @IsVerified = ${rev.isVerified === false ? 0 : 1},
      @DisplayOrder = ${rev.displayOrder ?? 1};
  `;
  await runSql(sql);
  return { success: true };
}

export async function deleteCustomerReview(id: string) {
  await runSql(`EXEC sp_DeleteCustomerReview @Id = N'${escapeSql(id)}';`);
  return { success: true };
}

// ----------------- Site Settings -----------------
export async function getSiteSettings() {
  return await runSql(`EXEC sp_GetSiteSettings;`);
}

export async function upsertSiteSetting(settingKey: string, settingValue: string, sectionName: string = 'General') {
  const sql = `
    EXEC sp_UpsertSiteSetting
      @SettingKey = N'${escapeSql(settingKey)}',
      @SettingValue = N'${escapeSql(settingValue)}',
      @SectionName = N'${escapeSql(sectionName)}';
  `;
  await runSql(sql);
  return { success: true };
}

export async function upsertSiteSettingsBatch(
  items: { key: string; value: string; section?: string }[]
) {
  if (!items || items.length === 0) return { success: true };

  const statements = items.map((item) => {
    return `EXEC sp_UpsertSiteSetting
      @SettingKey = N'${escapeSql(item.key)}',
      @SettingValue = N'${escapeSql(String(item.value ?? ''))}',
      @SectionName = N'${escapeSql(item.section || 'General')}';`;
  });

  const sql = `
    BEGIN TRANSACTION;
    ${statements.join('\n')}
    COMMIT TRANSACTION;
    SELECT 'SUCCESS' AS Status;
  `;
  await runSql(sql);
  return { success: true };
}

// ----------------- Database Status -----------------
export async function getDatabaseStatus() {
  const counts = await runSql(`
    SELECT
      (SELECT COUNT(*) FROM Categories) AS CategoriesCount,
      (SELECT COUNT(*) FROM CatalogWorks) AS WorksCount,
      (SELECT COUNT(*) FROM WorkMedia) AS MediaCount,
      (SELECT COUNT(*) FROM InstagramReels) AS ReelsCount,
      (SELECT COUNT(*) FROM CustomerReviews) AS ReviewsCount,
      (SELECT COUNT(*) FROM SiteSettings) AS SettingsCount;
  `);
  return {
    connected: true,
    server: 'DESKTOP-6Q3P8HQ',
    database: 'thepetalmuse',
    counts: counts[0] || null,
  };
}

function escapeSql(str: string = ''): string {
  if (typeof str !== 'string') return '';
  return str.replace(/'/g, "''");
}
