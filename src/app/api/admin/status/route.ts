import { NextResponse } from 'next/server';
import { getDatabaseStatus } from '@/lib/serverDb';

export async function GET() {
  try {
    const dbStatus = await getDatabaseStatus();
    return NextResponse.json({
      success: true,
      message: 'System status retrieved successfully.',
      data: {
        database: dbStatus,
        cloudinary: {
          apiKeyConfigured: true,
          apiKey: '655244333868859',
          defaultCloudName: process.env.CLOUDINARY_CLOUD_NAME || 'thepetalmuse',
        },
      },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching system status',
      data: null,
    }, { status: 500 });
  }
}

