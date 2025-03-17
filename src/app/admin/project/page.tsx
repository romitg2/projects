'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProjectFormData {
  title: string;
  description: string;
  thumbnail: string;
  techStack: string; // Comma separated list which can be converted to an array
  buildBlogLink: string;
  worksBlogLink: string;
  liveProjectLink: string;
  githubLink: string;
}

const ProjectForm: React.FC = () => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    thumbnail: '',
    techStack: '',
    buildBlogLink: '',
    worksBlogLink: '',
    liveProjectLink: '',
    githubLink: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Update form fields
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file selection for the thumbnail
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  // Upload the selected file to S3 using a pre-signed URL
  const uploadThumbnail = async (): Promise<string> => {
    if (!thumbnailFile) return '';
    setUploading(true);

    // Step 1: Request a pre-signed URL from your backend.
    // Adjust the API endpoint and payload as needed.
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: thumbnailFile.name,
        fileType: thumbnailFile.type,
      }),
    });

    const { url } = await response.json() as { url: string };
    console.log("-------- url -------", url);

    // Step 2: Upload the file to S3 using the pre-signed URL.
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': thumbnailFile.type,
      },
      body: thumbnailFile,
    });

    setUploading(false);
    // Assuming the S3 file URL is the pre-signed URL without query params.
    return url.split('?')[0];
  };

  // Submit the form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Upload thumbnail if a file is selected.
    let thumbnailUrl = formData.thumbnail;
    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnail();
    }

    // Convert comma separated tech stack to an array if needed.
    const dataToSubmit = {
      ...formData,
      thumbnail: thumbnailUrl,
      techStack: formData.techStack.split(',').map((tech) => tech.trim()),
    };

    // Here you can send dataToSubmit to your backend or handle it as needed.
    console.log('Submitting data:', dataToSubmit);

    // Send data to backend
    console.log("-------- dataToSubmit -------", dataToSubmit);
    const response = await fetch('/api/admin/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });

    const result = await response.json();
    console.log('Backend response:', result);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
          Thumbnail
        </label>
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          accept="image/*"
        />
        {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
      </div>

      <div>
        <label htmlFor="techStack" className="block text-sm font-medium text-gray-700">
          Tech Stack (comma separated)
        </label>
        <input
          type="text"
          name="techStack"
          id="techStack"
          value={formData.techStack}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Three.js, React-three-fiber, Next.js, TypeScript, AWS S3, DynamoDB"
          required
        />
      </div>

      <div>
        <label htmlFor="buildBlogLink" className="block text-sm font-medium text-gray-700">
          Build Blog Link
        </label>
        <input
          type="url"
          name="buildBlogLink"
          id="buildBlogLink"
          value={formData.buildBlogLink}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="worksBlogLink" className="block text-sm font-medium text-gray-700">
          Works Blog Link
        </label>
        <input
          type="url"
          name="worksBlogLink"
          id="worksBlogLink"
          value={formData.worksBlogLink}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="liveProjectLink" className="block text-sm font-medium text-gray-700">
          Live Project Link
        </label>
        <input
          type="url"
          name="liveProjectLink"
          id="liveProjectLink"
          value={formData.liveProjectLink}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700">
          GitHub Link
        </label>
        <input
          type="url"
          name="githubLink"
          id="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;