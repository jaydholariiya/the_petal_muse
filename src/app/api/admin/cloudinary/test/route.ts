import { NextResponse } from 'next/server';
import { upsertSiteSetting, getSiteSettings } from '@/lib/serverDb';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const cSetting = settings.find((s: any) => s.SettingKey === 'cloudinary_cloud_name');
    const cloudName = cSetting?.SettingValue || process.env.CLOUDINARY_CLOUD_NAME || '';

    let isConnected = false;
    let message = 'Cloudinary not tested yet';

    if (cloudName && cloudName !== 'thepetalmuse') {
      const apiKey = process.env.CLOUDINARY_API_KEY || '655244333868859';
      const apiSecret = process.env.CLOUDINARY_API_SECRET || 'HNOnhY5pU3lw4_epds_F1pDE08U';
      const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

      try {
        const pingRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/ping`, {
          headers: { Authorization: `Basic ${auth}` },
        });
        if (pingRes.ok) {
          isConnected = true;
          message = `Connected to Cloudinary account (${cloudName})`;
        } else {
          message = `Cloudinary verification failed (${pingRes.status})`;
        }
      } catch (err: any) {
        message = `Cloudinary network error: ${err.message}`;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        cloudName,
        apiKey: '655244333868859',
        isConnected,
        message,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cloudName = (body.cloudName || '').trim();
    const apiKey = (body.apiKey || '655244333868859').trim();
    const apiSecret = (body.apiSecret || 'HNOnhY5pU3lw4_epds_F1pDE08U').trim();

    if (!cloudName) {
      return NextResponse.json({
        success: false,
        message: 'Cloud Name is required. Find it on your Cloudinary Dashboard (e.g. dxyz123).',
      }, { status: 400 });
    }

    // Ping Cloudinary to verify credentials
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
    const pingRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/ping`, {
      headers: { Authorization: `Basic ${auth}` },
    });

    const pingData = await pingRes.json().catch(() => ({}));

    if (!pingRes.ok) {
      const errorMsg = pingData?.error?.message || `Cloudinary rejected with status ${pingRes.status}`;
      return NextResponse.json({
        success: false,
        message: `Cloudinary check failed: "${errorMsg}". Please double-check your Cloud Name on https://cloudinary.com/console (Account Details > Cloud name).`,
      }, { status: 400 });
    }

    // Save to SQL Server Database SiteSettings table
    await upsertSiteSetting('cloudinary_cloud_name', cloudName, 'Cloudinary');

    // Save to .env.local
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = [
      `CLOUDINARY_CLOUD_NAME=${cloudName}`,
      `CLOUDINARY_API_KEY=${apiKey}`,
      `CLOUDINARY_API_SECRET=${apiSecret}`,
      `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${cloudName}`,
      '',
    ].join('\n');

    await fs.writeFile(envPath, envContent, 'utf8');

    // Also update process.env in current running Node process
    process.env.CLOUDINARY_CLOUD_NAME = cloudName;
    process.env.CLOUDINARY_API_KEY = apiKey;
    process.env.CLOUDINARY_API_SECRET = apiSecret;

    return NextResponse.json({
      success: true,
      message: `Cloudinary account "${cloudName}" verified and saved to SQL Server and .env.local!`,
      data: {
        cloudName,
        apiKey,
        isConnected: true,
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error configuring Cloudinary',
    }, { status: 500 });
  }
}
