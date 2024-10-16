import { useEffect, useState } from 'react';
import Link from 'next/link';
import UserLayout from '@/components/UserLayout';
import UserNav from '@/components/UserNav';

export default function ExercisesList() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const res = await fetch('/api/get-exercise');
      const data = await res.json();
      setExercises(data.results);
    };
    fetchExercises();
  }, []);

  return (
    <UserLayout>
            <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
                <UserNav />
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
        Exercise List
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {exercises.map((exercise: any) => (
          <Link href={`/exercises/${exercise.id}`} key={exercise.id}>
            <div className="relative bg-gradient-to-br from-white h-56 to-gray-100 rounded-lg p-6 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
              {/* Decorative background accent */}
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg"></div>

              <h2 className="text-2xl font-semibold h-20 text-gray-900 mb-3 relative z-10 transition-transform duration-300 hover:scale-110">
                {exercise.exName}
              </h2>
              <p className="text-gray-700 mb-4 truncate relative z-10">
                {exercise.exDesc}
              </p>

              <div className="text-blue-600 font-medium hover:underline relative z-10">
                Edit Exercise
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
    </UserLayout>

  );
}
