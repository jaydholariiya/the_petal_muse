import { NextResponse } from 'next/server';
import { getInstagramReels, upsertInstagramReel } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const onlyActive = searchParams.get('onlyActive') === 'true';

    const reels = await getInstagramReels(onlyActive);
    return NextResponse.json({
      success: true,
      message: 'Reels retrieved successfully.',
      data: reels,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching reels',
      data: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || !body.posterUrl) {
      return NextResponse.json({
        success: false,
        message: 'Title and Poster URL are required.',
        data: null,
      }, { status: 400 });
    }

    const id = body.id || `reel-${Date.now().toString(36)}`;

    await upsertInstagramReel({
      id,
      title: body.title,
      caption: body.caption,
      videoUrl: body.videoUrl,
      posterUrl: body.posterUrl,
      duration: body.duration,
      instagramUrl: body.instagramUrl,
      displayOrder: body.displayOrder ? Number(body.displayOrder) : 1,
      isActive: body.isActive !== false,
    });

    clearContentCache();

    return NextResponse.json({
      success: true,
      message: 'Reel saved successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error saving reel',
      data: null,
    }, { status: 500 });
  }
}

