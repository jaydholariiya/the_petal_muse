import { v2 as cloudinary } from 'cloudinary';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dswr70tfw';
const API_KEY    = process.env.CLOUDINARY_API_KEY    || '655244333868859';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'HNOnhY5pU3lw4_epds_F1pDE08U';

export function configureCloudinary(overrideCloudName?: string) {
  cloudinary.config({
    cloud_name: overrideCloudName || CLOUD_NAME,
    api_key:    API_KEY,
    api_secret: API_SECRET,
    secure:     true,
  });
  return cloudinary;
}

export async function uploadMedia(
  fileBase64OrUrl: string,
  options: {
    folder?: string;
    resource_type?: 'image' | 'video' | 'auto';
    public_id?: string;
    cloudName?: string;
    format?: string;
  } = {}
) {
  const instance     = configureCloudinary(options.cloudName);
  const resourceType = options.resource_type || 'auto';
  const folder       = options.folder || 'the-petal-muse';

  const uploadParams: any = {
    folder,
    resource_type: resourceType,
    public_id:     options.public_id,
    overwrite:     true,
  };

  // If resourceType is image or auto, specify format 'jpg' so Cloudinary always stores/serves web-compatible JPEG
  if (resourceType === 'image' || options.format === 'jpg') {
    uploadParams.format = 'jpg';
  }

  const res = await instance.uploader.upload(fileBase64OrUrl, uploadParams);

  let secureUrl = res.secure_url;
  let url = res.url;
  if (secureUrl && secureUrl.toLowerCase().endsWith('.heic')) {
    secureUrl = secureUrl.replace(/\.heic$/i, '.jpg');
  }
  if (url && url.toLowerCase().endsWith('.heic')) {
    url = url.replace(/\.heic$/i, '.jpg');
  }

  return {
    publicId:     res.public_id,
    url:          url,
    secureUrl:    secureUrl,
    format:       res.format === 'heic' ? 'jpg' : res.format,
    width:        res.width,
    height:       res.height,
    resourceType: res.resource_type,
    bytes:        res.bytes,
    duration:     res.duration,
  };
}

/**
 * Extracts public_id and resource_type from a Cloudinary URL.
 * Safely strips transformations, version tags, and file extensions.
 * Returns null if the URL is not hosted on Cloudinary or is invalid.
 */
export function extractCloudinaryAsset(url?: string | null): {
  publicId: string;
  resourceType: 'image' | 'video' | 'raw';
} | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed.includes('cloudinary.com')) return null;

  try {
    const isVideo =
      trimmed.includes('/video/upload/') ||
      /\.(mp4|mov|webm|avi|m4v)(\?.*)?$/i.test(trimmed);
    const isRaw = trimmed.includes('/raw/upload/');
    const resourceType: 'image' | 'video' | 'raw' = isVideo
      ? 'video'
      : isRaw
      ? 'raw'
      : 'image';

    const uploadIdx = trimmed.indexOf('/upload/');
    if (uploadIdx === -1) return null;

    let pathAfterUpload = trimmed.substring(uploadIdx + '/upload/'.length);
    // Remove query params or hash if any
    pathAfterUpload = pathAfterUpload.split('?')[0].split('#')[0];

    const segments = pathAfterUpload.split('/').filter(Boolean);
    const assetSegments: string[] = [];
    let foundVersion = false;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      // Check for version segment: e.g. v1794846243 or v1
      if (!foundVersion && /^v\d+$/.test(seg)) {
        foundVersion = true;
        continue;
      }
      // If version hasn't appeared yet, skip transformation segments (contain comma or e.g. c_scale, w_500, etc.)
      if (!foundVersion && (seg.includes(',') || /^[a-z]{1,4}_[a-zA-Z0-9_-]+$/.test(seg))) {
        continue;
      }
      assetSegments.push(seg);
    }

    if (assetSegments.length === 0) return null;

    const fullPath = assetSegments.join('/');
    // Cloudinary public_id does not include the file extension for standard images/videos
    const lastDotIndex = fullPath.lastIndexOf('.');
    const publicId = lastDotIndex !== -1 ? fullPath.substring(0, lastDotIndex) : fullPath;

    if (!publicId) return null;

    return { publicId, resourceType };
  } catch (err) {
    console.warn('[extractCloudinaryAsset] Error parsing URL:', err);
    return null;
  }
}

export async function deleteMedia(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
) {
  const instance = configureCloudinary();
  return await instance.uploader.destroy(publicId, {
    resource_type: resourceType,
    invalidate: true,
  });
}

/**
 * Automatically parses a Cloudinary URL and destroys the asset to save Cloudinary storage quota.
 * Safely ignores external URLs (e.g. Unsplash) and local paths.
 */
export async function deleteMediaByUrl(url?: string | null): Promise<boolean> {
  if (!url) return false;
  const asset = extractCloudinaryAsset(url);
  if (!asset) return false;

  try {
    console.log(`[Cloudinary Cleanup] Destroying asset ${asset.publicId} (${asset.resourceType})...`);
    const res = await deleteMedia(asset.publicId, asset.resourceType);
    console.log(`[Cloudinary Cleanup] Response for ${asset.publicId}:`, res?.result || res);
    return res?.result === 'ok' || res?.result === 'not found';
  } catch (err: any) {
    console.warn(`[Cloudinary Cleanup] Could not delete ${asset.publicId}:`, err.message);
    return false;
  }
}

export async function deleteMultipleMediaByUrls(urls: (string | null | undefined)[]): Promise<number> {
  let count = 0;
  const validUrls = urls.filter((u): u is string => Boolean(u && typeof u === 'string' && u.includes('cloudinary.com')));
  for (const url of validUrls) {
    const success = await deleteMediaByUrl(url);
    if (success) count++;
  }
  return count;
}
