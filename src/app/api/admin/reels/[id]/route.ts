import { NextResponse } from 'next/server';
import { deleteInstagramReel } from '@/lib/serverDb';
import { clearContentCache } from '@/lib/contentCache';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'Reel ID is required.',
        data: null,
      }, { status: 400 });
    }

    await deleteInstagramReel(id);
    clearContentCache();
    return NextResponse.json({
      success: true,
      message: 'Reel deleted successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error deleting reel',
      data: null,
    }, { status: 500 });
  }
}

