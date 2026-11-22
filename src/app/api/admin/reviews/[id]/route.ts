import { NextResponse } from 'next/server';
import { deleteCustomerReview } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export const dynamic = 'force-dynamic';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Review ID is required.',
        data: null,
      }, { status: 400 });
    }

    await deleteCustomerReview(id);
    clearContentCache();
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error deleting review',
      data: null,
    }, { status: 500 });
  }
}

