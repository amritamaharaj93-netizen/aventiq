'use server';

import { uploadToCloudinary } from '@/lib/cloudinary';

export async function uploadMedia(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'aventiq_uploads';
    
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Determine resource type based on file type
    const resourceType = file.type.startsWith('video/') ? 'video' : 'image';

    const result = await uploadToCloudinary(file, folder, resourceType);

    return {
      success: true,
      result: result as any,
    };
  } catch (error: any) {
    console.error('Error uploading media:', error);
    return {
      success: false,
      error: error.message || 'Upload failed',
    };
  }
}
