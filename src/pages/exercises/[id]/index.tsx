import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditExercise() {
  const router = useRouter();
  const { id } = router.query;

  const [exercise, setExercise] = useState(null);
  const [exName, setExName] = useState('');
  const [exDesc, setExDesc] = useState('');
  const [newPic, setNewPic] = useState<File | null>(null);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Uploading state
  const [uploadProgress, setUploadProgress] = useState<number>(0); // Progress state

  useEffect(() => {
    if (id) {
      const fetchExercise = async () => {
        const res = await fetch(`/api/get-exercise/${id}`);
        const data = await res.json();
        setExercise(data);
        setExName(data.exName);
        setExDesc(data.exDesc);
      };
      fetchExercise();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUploading(true); // Start uploading indicator
    setUploadProgress(0); // Reset progress bar

    let newPicUrl = null;
    let newVideoUrl = null;

    // Upload image if selected
    if (newPic) {
      newPicUrl = await uploadFile(newPic, "image");
    }

    // Upload video if selected
    if (newVideo) {
      newVideoUrl = await uploadFile(newVideo, "video");
    }

    // Prepare form data for exercise update
    const formData = {
      exName,
      exDesc,
      exPic:newPicUrl,
      exVideo:newVideoUrl,
    };

    // Send the PUT request to update exercise
    const res = await fetch(`/api/get-exercise/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setIsUploading(false); // Stop uploading indicator

    if (res.ok) {
      router.push('/exercises');
    }
  };

  // Function to upload files to the backend or external storage
  const uploadFile = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.url; // URL to the uploaded file
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Edit Exercise</h1>

      <form onSubmit={handleUpdate} className="bg-white shadow-lg border border-gray-200 rounded-lg p-8 space-y-6">
        <div>
          <label className="block mb-2 text-lg font-medium text-gray-800">Exercise Name</label>
          <input
            type="text"
            value={exName}
            onChange={(e) => setExName(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-medium text-gray-800">Exercise Description</label>
          <textarea
            value={exDesc}
            onChange={(e) => setExDesc(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            rows={4}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-lg font-medium text-gray-800">Upload New Image</label>
          <input
            type="file"
            onChange={(e: any) => setNewPic(e.target.files[0])}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
          />
        </div>

        <div>
          <label className="block mb-2 text-lg font-medium text-gray-800">Upload New Video</label>
          <input
            type="file"
            onChange={(e: any) => setNewVideo(e.target.files[0])}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
          />
        </div>

        {isUploading && (
          <div className="text-blue-500 text-center">
            Uploading... {uploadProgress}% {/* Display progress here */}
          </div>
        )}

        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-3 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          {isUploading ? "Updating..." : "Update Exercise"}
        </button>
      </form>
    </div>
  );
}
