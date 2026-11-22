import { NextResponse } from 'next/server';
import { uploadMedia, deleteMediaByUrl, deleteMedia } from '@/lib/cloudinary';
import { convertHeicToJpegBuffer } from '@/lib/heicConverter';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let filePayload: string = '';
    let resourceType: 'image' | 'video' | 'auto' = 'auto';
    let folder = 'the-petal-muse';
    let previousUrl: string = '';

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
      previousUrl =
        (formData.get('previousUrl') as string) ||
        (formData.get('replaceUrl') as string) ||
        (formData.get('oldUrl') as string) ||
        '';

      let buffer: any = Buffer.from(await file.arrayBuffer());
      let mimeType = file.type || 'image/jpeg';
      const fileName = file.name || '';
      const isHeic =
        fileName.toLowerCase().endsWith('.heic') ||
        fileName.toLowerCase().endsWith('.heif') ||
        mimeType.includes('heic') ||
        mimeType.includes('heif');

      if (isHeic) {
        try {
          console.log(`[Upload] Auto-converting HEIC photo (${fileName}) to calibrated JPEG...`);
          buffer = await convertHeicToJpegBuffer(buffer);
          mimeType = 'image/jpeg';
          console.log(`[Upload] HEIC conversion succeeded!`);
        } catch (convErr: any) {
          console.warn('[Upload] HEIC conversion fallback:', convErr.message);
        }
      }

      filePayload = `data:${mimeType};base64,${buffer.toString('base64')}`;

    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      filePayload  = body.file;          // base64 data-URL or remote URL
      resourceType = body.resourceType || 'auto';
      folder       = body.folder || 'the-petal-muse';
      previousUrl  = body.previousUrl || body.replaceUrl || body.oldUrl || '';

      if (
        filePayload &&
        (filePayload.startsWith('data:image/heic') ||
          filePayload.startsWith('data:image/heif'))
      ) {
        try {
          const base64Data = filePayload.split(',')[1];
          if (base64Data) {
            let buffer: any = Buffer.from(base64Data, 'base64');
            buffer = await convertHeicToJpegBuffer(buffer);
            filePayload = `data:image/jpeg;base64,${buffer.toString('base64')}`;
          }
        } catch (convErr: any) {
          console.warn('[Upload] HEIC JSON conversion fallback:', convErr.message);
        }
      }
    }

    if (!filePayload) {
      return NextResponse.json(
        { success: false, message: 'File content is required.' },
        { status: 400 }
      );
    }

    // ── Upload directly to Cloudinary ─────────────────────────────────────────
    const result = await uploadMedia(filePayload, { folder, resource_type: resourceType });

    // ── Clean up replaced asset from Cloudinary (saves quota/memory) ──────────
    let previousDeleted = false;
    if (
      previousUrl &&
      previousUrl.trim() !== '' &&
      previousUrl !== result.secureUrl &&
      previousUrl !== result.url
    ) {
      try {
        console.log(`[Upload Route] Replaced media detected. Removing old Cloudinary asset: ${previousUrl}`);
        previousDeleted = await deleteMediaByUrl(previousUrl.trim());
      } catch (delErr: any) {
        console.warn('[Upload Route] Cleanup of old asset skipped/failed:', delErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Uploaded to Cloudinary successfully.',
      data: {
        ...result,
        source: 'cloudinary',
        previousDeleted,
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

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let url = searchParams.get('url');
    let publicId = searchParams.get('publicId');
    let resourceType = (searchParams.get('resourceType') || 'image') as 'image' | 'video';

    if (!url && !publicId) {
      const body = await req.json().catch(() => ({}));
      url = body.url;
      publicId = body.publicId;
      if (body.resourceType) resourceType = body.resourceType;
    }

    if (url) {
      const deleted = await deleteMediaByUrl(url);
      return NextResponse.json({
        success: true,
        deleted,
        message: deleted ? 'Cloudinary asset deleted successfully.' : 'Asset skipped or not on Cloudinary.',
      });
    }

    if (publicId) {
      const res = await deleteMedia(publicId, resourceType);
      return NextResponse.json({
        success: true,
        result: res,
        message: 'Cloudinary asset destroyed via publicId.',
      });
    }

    return NextResponse.json(
      { success: false, message: 'url or publicId is required for deletion.' },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('[Delete Error]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Delete failed.' },
      { status: 500 }
    );
  }
}
