import { NextResponse } from 'next/server';
import { getCatalogWorks, upsertCatalogWork, replaceWorkMedia } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const onlyActive = searchParams.get('onlyActive') === 'true';

    const works = await getCatalogWorks(categoryId, onlyActive);
    return NextResponse.json({
      success: true,
      message: 'Catalog works retrieved successfully.',
      data: works,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching catalog works',
      data: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const coverImage = body.coverImage || body.coverImageUrl;
    if (!body.title || !body.categoryId || !coverImage) {
      return NextResponse.json({
        success: false,
        message: 'Title, Category, and Cover Image URL are required.',
        data: null,
      }, { status: 400 });
    }

    const id = body.id || `work-${Date.now().toString(36)}`;
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await upsertCatalogWork({
      id,
      categoryId: body.categoryId,
      title: body.title,
      slug,
      badge: body.badge,
      description: body.description || body.shortDescription || body.fullStory,
      price: body.price || body.priceDisplay,
      coverImage,
      isSignature: Boolean(body.isFeatured || body.isSignature),
      workOrder: body.workOrder ? Number(body.workOrder) : 1,
      isActive: body.isActive !== false,
    });

    // Save 5 Photos and 1 Video to WorkMedia table if provided
    if (Array.isArray(body.images) || body.videoUrl) {
      const mediaList: { mediaType: 'image' | 'video'; mediaUrl: string; displayOrder: number }[] = [];
      
      const images: string[] = Array.isArray(body.images) ? body.images : [coverImage];
      images.forEach((imgUrl, idx) => {
        if (imgUrl && typeof imgUrl === 'string' && imgUrl.trim()) {
          mediaList.push({
            mediaType: 'image',
            mediaUrl: imgUrl.trim(),
            displayOrder: idx + 1,
          });
        }
      });

      if (body.videoUrl && typeof body.videoUrl === 'string' && body.videoUrl.trim()) {
        mediaList.push({
          mediaType: 'video',
          mediaUrl: body.videoUrl.trim(),
          displayOrder: 99,
        });
      }

      if (mediaList.length > 0) {
        await replaceWorkMedia(id, mediaList);
      }
    }

    clearContentCache();

    return NextResponse.json({
      success: true,
      message: 'Catalog work and media saved successfully.',
      data: { id, slug },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error saving catalog work',
      data: null,
    }, { status: 500 });
  }
}

