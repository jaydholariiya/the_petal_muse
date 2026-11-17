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
  } = {}
) {
  const instance     = configureCloudinary(options.cloudName);
  const resourceType = options.resource_type || 'auto';
  const folder       = options.folder || 'the-petal-muse';

  const res = await instance.uploader.upload(fileBase64OrUrl, {
    folder,
    resource_type: resourceType,
    public_id:     options.public_id,
    overwrite:     true,
  });

  return {
    publicId:     res.public_id,
    url:          res.url,
    secureUrl:    res.secure_url,
    format:       res.format,
    width:        res.width,
    height:       res.height,
    resourceType: res.resource_type,
    bytes:        res.bytes,
    duration:     res.duration,
  };
}

export async function deleteMedia(
  publicId: string,
  resourceType: 'image' | 'video' = 'image'
) {
  const instance = configureCloudinary();
  return await instance.uploader.destroy(publicId, { resource_type: resourceType });
}
