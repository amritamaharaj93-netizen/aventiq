import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file (Buffer or File) to Cloudinary
 * @param file - The file to upload (as a base64 string, File object, or Buffer)
 * @param folder - The folder in Cloudinary to upload to
 * @param resourceType - The type of resource ('image', 'video', 'raw', 'auto')
 * @returns The Cloudinary upload response
 */
export async function uploadToCloudinary(
  file: File | Buffer | string,
  folder: string = 'aventiq',
  resourceType: 'image' | 'video' | 'auto' = 'auto'
) {
  try {
    let fileToUpload: string;

    if (typeof file === 'string') {
      // If it's already a base64 string or URL
      fileToUpload = file;
    } else if (Buffer.isBuffer(file)) {
      // If it's a buffer
      const base64Data = file.toString('base64');
      // We might need to guess mime type or just use auto
      fileToUpload = `data:image/jpeg;base64,${base64Data}`;
    } else {
      // If it's a File object (e.g. from FormData)
      const fileObj = file as File;
      const arrayBuffer = await fileObj.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Data = buffer.toString('base64');
      fileToUpload = `data:${fileObj.type || 'application/octet-stream'};base64,${base64Data}`;
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        fileToUpload,
        {
          folder: folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

export default cloudinary;
