import { NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';
import { runSql, getSiteSettings } from '@/lib/serverDb';
import fs from 'fs/promises';
import path from 'path';

export async function POST() {
  try {
    const settings = await getSiteSettings();
    const cSetting = settings.find((s: any) => s.SettingKey === 'cloudinary_cloud_name');
    const cloudName = cSetting?.SettingValue || process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudName || cloudName === 'thepetalmuse') {
      return NextResponse.json({
        success: false,
        message: 'Please set and verify your Cloudinary Cloud Name first before syncing.',
      }, { status: 400 });
    }

    const uploadedUrls: Record<string, string> = {};
    const magazinesDir = path.join(process.cwd(), 'public', 'works', 'magazines');

    try {
      const files = await fs.readdir(magazinesDir);
      for (const file of files) {
        if (!file.match(/\.(png|jpg|jpeg|webp)$/i)) continue;
        const localPath = path.join(magazinesDir, file);
        const fileBuf = await fs.readFile(localPath);
        const base64 = `data:image/png;base64,${fileBuf.toString('base64')}`;
        const safePublicId = `magazines/${file.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')}`;

        const uploadRes = await uploadMedia(base64, {
          folder: 'the-petal-muse',
          public_id: safePublicId,
          cloudName,
          resource_type: 'image',
        });

        const webLocalPath = `/works/magazines/${file}`;
        uploadedUrls[webLocalPath] = uploadRes.secureUrl;
      }
    } catch (e) {
      console.warn('Magazines dir error:', e);
    }

    // Now update database records that referenced these local magazine files
    let updatedCount = 0;
    for (const [localUrl, cloudUrl] of Object.entries(uploadedUrls)) {
      // Update CatalogWorks
      const escapedLocal = localUrl.replace(/'/g, "''");
      const escapedCloud = cloudUrl.replace(/'/g, "''");
      await runSql(`UPDATE CatalogWorks SET CoverImage = N'${escapedCloud}' WHERE CoverImage = N'${escapedLocal}'`);
      await runSql(`UPDATE WorkMedia SET MediaUrl = N'${escapedCloud}' WHERE MediaUrl = N'${escapedLocal}'`);
      updatedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${Object.keys(uploadedUrls).length} local media assets to Cloudinary and updated database!`,
      data: {
        syncedCount: Object.keys(uploadedUrls).length,
        uploadedUrls,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error syncing to Cloudinary',
    }, { status: 500 });
  }
}

