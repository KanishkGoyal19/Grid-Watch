'use client';
import { useEffect, useState } from 'react';
import { constructorImageBaseURL, constructorSlugMap } from '@/data/constructors';

const getConstructorImage = (id) => {
  const slug = constructorSlugMap[id];
  return slug
    ? `${constructorImageBaseURL}${slug}.png`
    : '/cars/default.png';
};

const ConstructorPage = () => {
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConstructors = async () => {
      try {
        const res = await fetch('https://api.jolpi.ca/ergast/f1/2025/constructorStandings.json');
        const data = await res.json();
        const standings = data?.MRData?.StandingsTable?.StandingsLists[0]?.ConstructorStandings || [];
        setConstructors(standings);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructors();
  }, []);

  if (loading) return <main className="p-8 text-white">Loading...</main>;
  if (error) return <main className="p-8 text-red-500">Error: {error.message}</main>;

  return (
    <main className="min-h-screen bg-black p-8">
      <h1 className="text-white text-3xl font-bold mb-6">Constructor Standings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {constructors.map((c) => {
          const imageUrl = getConstructorImage(c.Constructor.constructorId);

          return (
            <div
              key={c.Constructor.name}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={`${c.Constructor.name} Car`}
                className="w-full h-40 object-contain bg-black"
              />
              <div className="p-4 text-white">
                <h2 className="text-xl font-bold mb-2">{c.Constructor.name}</h2>
                <p className="text-sm">Team Nationality: {c.Constructor.nationality}</p>
                <p className="text-sm">Position: {c.position}</p>
                <p className="text-sm">Points: {c.points}</p>
                <p className="text-sm">Wins: {c.wins}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default ConstructorPage;
