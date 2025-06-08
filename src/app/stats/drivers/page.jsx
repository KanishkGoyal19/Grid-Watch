'use client';
import { useDriverData } from '@/context/DriverDataContext';
import DriverCard from '@/components/drivers/driverCard';

export default function DriversStatsPage() {
  const { drivers, loading, error } = useDriverData();

  if (loading) {
    return (
      <main className="min-h-screen bg-black p-8">
        <h1 className="text-white text-3xl font-bold mb-6">F1 Drivers</h1>
        <p className="text-white">Loading drivers and standings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black p-8">
        <h1 className="text-white text-3xl font-bold mb-6">F1 Drivers</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  const sortedDrivers = [...drivers].sort((a, b) => {
    const posA = parseInt(a.position || '', 10);
    const posB = parseInt(b.position || '', 10);

    if (isNaN(posA)) return 1;
    if (isNaN(posB)) return -1;

    return posA - posB;
  });

  return (
    <main className="min-h-screen bg-black p-8">
      <h1 className="text-white text-3xl font-bold mb-6">F1 Drivers</h1>
      <div className="space-y-8">
        {/* Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedDrivers.slice(0, 3).map((driver) => (
            <DriverCard key={driver.full_name} driver={driver} />
          ))}
        </div>

        {/* Rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedDrivers.slice(3).map((driver) => (
            <DriverCard key={driver.full_name} driver={driver} />
          ))}
        </div>
      </div>
    </main>
  );
}
