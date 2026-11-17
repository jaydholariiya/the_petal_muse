import { NextResponse } from 'next/server';
import { getSiteSettings, upsertSiteSetting, upsertSiteSettingsBatch } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      success: true,
      message: 'Site settings retrieved successfully.',
      data: settings,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching site settings',
      data: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Support batch saving: { items: [ { key, value, section } ] }
    if (Array.isArray(body.items)) {
      const items = body.items
        .filter((item: any) => item && item.key && item.value !== undefined)
        .map((item: any) => ({
          key: item.key,
          value: String(item.value),
          section: item.section || 'General',
        }));

      await upsertSiteSettingsBatch(items);
      clearContentCache();

      return NextResponse.json({
        success: true,
        message: `${items.length} site settings updated successfully.`,
        data: null,
      });
    }

    // Support key-value map: { settings: { hero_headlineLine1: "...", ... }, section: "Hero" }
    if (body.settings && typeof body.settings === 'object') {
      const section = body.section || 'General';
      const items = Object.entries(body.settings)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => ({
          key,
          value: String(value),
          section,
        }));

      await upsertSiteSettingsBatch(items);
      clearContentCache();

      return NextResponse.json({
        success: true,
        message: `${items.length} section settings updated successfully.`,
        data: null,
      });
    }

    if (!body.settingKey || body.settingValue === undefined) {
      return NextResponse.json({
        success: false,
        message: 'SettingKey and SettingValue are required.',
        data: null,
      }, { status: 400 });
    }

    await upsertSiteSetting(body.settingKey, String(body.settingValue), body.sectionName || body.section || 'General');
    clearContentCache();

    return NextResponse.json({
      success: true,
      message: 'Setting updated successfully.',
      data: { key: body.settingKey, value: body.settingValue },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error updating site setting',
      data: null,
    }, { status: 500 });
  }
}

