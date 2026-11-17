import { CATALOG_WORKS } from '../content/catalogWorks';
import { SITE_CONTENT } from '../content/site';
import fs from 'fs';
import path from 'path';

function escapeSql(str: any) {
  if (str === null || str === undefined) return 'NULL';
  return "N'" + String(str).replace(/'/g, "''") + "'";
}

let sql = `USE thepetalmuse;
GO

PRINT 'Seeding Categories...';
`;

// Seed Categories
const categories = SITE_CONTENT.productCategories || [];
categories.forEach((cat, idx) => {
  sql += `EXEC sp_UpsertCategory 
    @Id = ${escapeSql(cat.id)},
    @Slug = ${escapeSql(cat.slug)},
    @Name = ${escapeSql(cat.name)},
    @ShortTitle = ${escapeSql(cat.name.split('&')[0].trim())},
    @Subtitle = ${escapeSql((cat as any).subtitle || (cat as any).shortTagline || '')},
    @Description = ${escapeSql(cat.description || '')},
    @ImageUrl = ${escapeSql(cat.imageUrl || '')},
    @Badge = ${escapeSql(cat.badge || 'Atelier Collection')},
    @DisplayOrder = ${idx + 1},
    @IsActive = 1;
`;
});

sql += `\nPRINT 'Seeding Catalog Works...';\n`;

// Seed Catalog Works
Object.entries(CATALOG_WORKS).forEach(([catId, works]) => {
  works.forEach((work, wIdx) => {
    sql += `EXEC sp_UpsertCatalogWork
      @Id = ${escapeSql(work.id)},
      @CategoryId = ${escapeSql(catId)},
      @Title = ${escapeSql(work.title)},
      @Slug = ${escapeSql((work as any).slug || '')},
      @Price = ${escapeSql((work as any).price || '')},
      @PriceNumber = ${parseFloat(((work as any).price || '').replace(/[^0-9.]/g, '')) || 0},
      @Description = ${escapeSql(work.description || '')},
      @Badge = ${escapeSql(work.badge || '')},
      @CoverImage = ${escapeSql(work.coverImage)},
      @WorkOrder = ${wIdx + 1},
      @Tags = ${escapeSql(((work as any).tags || []).join(', '))},
      @IsSignature = ${work.badge?.includes('Signature') ? 1 : 0},
      @IsActive = 1;
`;

    // Seed Media (images & video)
    if (work.images && work.images.length > 0) {
      work.images.forEach((img, iIdx) => {
        sql += `EXEC sp_AddWorkMedia
          @WorkId = ${escapeSql(work.id)},
          @MediaType = 'image',
          @MediaUrl = ${escapeSql(img)},
          @DisplayOrder = ${iIdx + 1};
`;
      });
    }

    if (work.videoUrl) {
      sql += `EXEC sp_AddWorkMedia
        @WorkId = ${escapeSql(work.id)},
        @MediaType = 'video',
        @MediaUrl = ${escapeSql(work.videoUrl)},
        @DisplayOrder = 99;
`;
    }
  });
});

sql += `\nPRINT 'Seeding Instagram Reels...';\n`;

// Seed Instagram Reels
const reels = (SITE_CONTENT as any).reels || [];
reels.forEach((reel: any, rIdx: number) => {
  sql += `EXEC sp_UpsertInstagramReel
    @Id = ${escapeSql(reel.id)},
    @Title = ${escapeSql(reel.title)},
    @Caption = ${escapeSql(reel.caption || '')},
    @VideoUrl = ${escapeSql(reel.videoUrl || reel.instagramUrl || '')},
    @CoverImageUrl = ${escapeSql(reel.posterUrl || '')},
    @ViewsDisplay = ${escapeSql(reel.duration || '0:30')},
    @LikesDisplay = ${escapeSql('Instagram Reel')},
    @DisplayOrder = ${rIdx + 1},
    @IsActive = 1;
`;
});

sql += `\nPRINT 'Seeding Customer Reviews...';\n`;

// Seed Customer Reviews
const reviews = (SITE_CONTENT as any).customerReviews?.reviews || [];
reviews.forEach((rev: any, revIdx: number) => {
  sql += `EXEC sp_UpsertCustomerReview
    @Id = ${escapeSql(rev.id || `rev-${revIdx + 1}`)},
    @Author = ${escapeSql(rev.name || 'Anonymous Patron')},
    @Occasion = ${escapeSql(rev.occasion || '')},
    @City = ${escapeSql(rev.location || '')},
    @Rating = ${rev.rating || 5},
    @ReviewText = ${escapeSql(rev.quote || '')},
    @PhotoUrl = ${escapeSql(rev.photoUrl || '')},
    @IsVerified = 1,
    @DisplayOrder = ${revIdx + 1};
`;
});

sql += `\nPRINT 'Seeding Site Settings...';\n`;

const brand = SITE_CONTENT.brand;
if (brand) {
  sql += `EXEC sp_UpsertSiteSetting @SettingKey = 'brand_name', @SettingValue = ${escapeSql(brand.name)}, @SectionName = 'Brand';\n`;
  sql += `EXEC sp_UpsertSiteSetting @SettingKey = 'brand_owner', @SettingValue = ${escapeSql(brand.owner)}, @SectionName = 'Brand';\n`;
  sql += `EXEC sp_UpsertSiteSetting @SettingKey = 'brand_role', @SettingValue = ${escapeSql(brand.role)}, @SectionName = 'Brand';\n`;
  sql += `EXEC sp_UpsertSiteSetting @SettingKey = 'brand_instagram', @SettingValue = ${escapeSql(brand.instagramUrl)}, @SectionName = 'Brand';\n`;
  sql += `EXEC sp_UpsertSiteSetting @SettingKey = 'brand_whatsapp', @SettingValue = ${escapeSql(SITE_CONTENT.whatsapp?.phoneNumber || '')}, @SectionName = 'Contact';\n`;
}

fs.writeFileSync(path.join(__dirname, '../database/seed_data.sql'), sql, 'utf8');
console.log('Successfully generated database/seed_data.sql!');
