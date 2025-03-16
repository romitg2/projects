'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
 const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);

    // Get pre-signed URL
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    const { url } = await response.json();
    console.log("-------- url -------", url);

    // Upload file to S3
    try {
      const response = await axios.put(url, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          console.log("Upload Progress:", progressEvent.loaded * 100 / progressEvent.total!);
          setProgress(progressEvent.loaded * 100 / progressEvent.total!);
        },
      });
      console.log("Upload Response:", response);

    } catch (error) {
      console.error("Upload Error:", error);
    }

    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
      <input type="file" onChange={handleFileChange} />
      <Button onClick={uploadFile} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      <div className="w-full bg-gray-200 rounded-full">
        <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default UploadPage;