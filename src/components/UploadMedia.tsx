'use client';

import { useState } from 'react';
import { uploadMedia } from '@/actions/upload';

export default function UploadMedia() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'my_uploads'); // Optional

    try {
      const response = await uploadMedia(formData);
      if (response.success) {
        setUploadResult(response.result);
      } else {
        setError(response.error || 'Upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-md max-w-md">
      <h3 className="text-lg font-semibold">Upload Photo or Video</h3>
      
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {isUploading && <p className="text-sm text-blue-600">Uploading...</p>}
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      
      {uploadResult && (
        <div className="mt-4">
          <p className="text-sm text-green-600 font-medium mb-2">Upload successful!</p>
          {uploadResult.resource_type === 'video' ? (
            <video 
              src={uploadResult.secure_url} 
              controls 
              className="w-full h-auto rounded-md"
            />
          ) : (
            <img 
              src={uploadResult.secure_url} 
              alt="Uploaded media" 
              className="w-full h-auto rounded-md"
            />
          )}
        </div>
      )}
    </div>
  );
}
