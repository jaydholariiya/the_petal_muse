import { NextResponse } from 'next/server';
import { uploadMedia } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let filePayload: string = '';
    let resourceType: 'image' | 'video' | 'auto' = 'auto';
    let folder = 'the-petal-muse';

    // ── Parse incoming request ────────────────────────────────────────────────
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return NextResponse.json(
          { success: false, message: 'No file found in upload.' },
          { status: 400 }
        );
      }

      resourceType =
        (formData.get('resourceType') as 'image' | 'video' | 'auto') ||
        (file.type.startsWith('video/') ? 'video' : 'image');
      folder = (formData.get('folder') as string) || 'the-petal-muse';

      const buffer = Buffer.from(await file.arrayBuffer());
      filePayload  = `data:${file.type};base64,${buffer.toString('base64')}`;

    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      filePayload  = body.file;          // base64 data-URL or remote URL
      resourceType = body.resourceType || 'auto';
      folder       = body.folder || 'the-petal-muse';
    }

    if (!filePayload) {
      return NextResponse.json(
        { success: false, message: 'File content is required.' },
        { status: 400 }
      );
    }

    // ── Upload directly to Cloudinary ─────────────────────────────────────────
    const result = await uploadMedia(filePayload, { folder, resource_type: resourceType });

    return NextResponse.json({
      success: true,
      message: 'Uploaded to Cloudinary successfully.',
      data: {
        ...result,
        source: 'cloudinary',
      },
    });

  } catch (err: any) {
    console.error('[Upload Error]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Upload failed.' },
      { status: 500 }
    );
  }
}
