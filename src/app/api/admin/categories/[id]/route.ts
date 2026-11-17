import { NextResponse } from 'next/server';
import { deleteCategory } from '@/lib/serverDb';
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
        message: 'Category ID is required.',
        data: null,
      }, { status: 400 });
    }

    await deleteCategory(id);
    clearContentCache();
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully.',
      data: { id },
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message || 'Error deleting category',
      data: null,
    }, { status: 500 });
  }
}

