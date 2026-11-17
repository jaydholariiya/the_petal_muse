import { NextResponse } from 'next/server';
import { getCategories, upsertCategory } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({
      success: true,
      message: 'Categories retrieved successfully.',
      data: categories,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching categories',
      data: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({
        success: false,
        message: 'Name and Slug are required fields.',
        data: null,
      }, { status: 400 });
    }

    const id = body.id || `cat-${Date.now().toString(36)}`;
    await upsertCategory({
      id,
      slug: body.slug,
      name: body.name,
      shortTitle: body.shortTitle,
      subtitle: body.subtitle,
      description: body.description,
      imageUrl: body.imageUrl,
      badge: body.badge,
      displayOrder: body.displayOrder ? Number(body.displayOrder) : 1,
      isActive: body.isActive !== false,
    });

    clearContentCache();

    return NextResponse.json({
      success: true,
      message: 'Category saved successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error saving category',
      data: null,
    }, { status: 500 });
  }
}

