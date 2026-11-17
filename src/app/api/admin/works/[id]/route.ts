import { NextResponse } from 'next/server';
import { deleteCatalogWork } from '@/lib/serverDb';
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
        message: 'Work ID is required.',
        data: null,
      }, { status: 400 });
    }

    await deleteCatalogWork(id);
    clearContentCache();
    return NextResponse.json({
      success: true,
      message: 'Catalog work deleted successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error deleting catalog work',
      data: null,
    }, { status: 500 });
  }
}

