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

    const formData: {
      exName: string;
      exDesc: string;
      newPic?: string;
      newVideo?: string;
    } = {
      exName,
      exDesc,
    };

    if (newPic) {
      formData.newPic = await convertToBase64(newPic);
    }

    if (newVideo) {
      formData.newVideo = await convertToBase64(newVideo);
    }

    const res = await fetch(`/api/get-exercise/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/exercises');
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return <div className="container mx-auto p-6">
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

    <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-3 rounded-lg hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
      Update Exercise
    </button>
  </form>
</div>

}
