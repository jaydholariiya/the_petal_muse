import { NextResponse } from 'next/server';
import { getCustomerReviews, upsertCustomerReview } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const onlyApproved = searchParams.get('onlyApproved') === 'true';

    const reviews = await getCustomerReviews(onlyApproved);
    return NextResponse.json({
      success: true,
      message: 'Reviews retrieved successfully.',
      data: reviews,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error fetching reviews',
      data: [],
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const author = body.author || body.customerName;
    if (!author || !body.reviewText) {
      return NextResponse.json({
        success: false,
        message: 'Author/Customer name and Review text are required.',
        data: null,
      }, { status: 400 });
    }

    const id = body.id || `rev-${Date.now().toString(36)}`;

    await upsertCustomerReview({
      id,
      author,
      city: body.city || body.location,
      occasion: body.occasion,
      rating: body.rating ? Number(body.rating) : 5,
      reviewText: body.reviewText,
      photoUrl: body.photoUrl || body.customerPhotoUrl,
      isVerified: body.isVerified !== false,
      displayOrder: body.displayOrder ? Number(body.displayOrder) : 1,
    });

    clearContentCache();

    return NextResponse.json({
      success: true,
      message: 'Review saved successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error saving review',
      data: null,
    }, { status: 500 });
  }
}
