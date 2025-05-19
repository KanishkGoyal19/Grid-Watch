import { useEffect, useState } from 'react';

const useRaceSchedule = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch('https://api.jolpi.ca/ergast/f1/current/races/');
        const data = await res.json();
        setRaces(data?.MRData?.RaceTable?.Races || []);
      } catch (error) {
        console.error('Error fetching race schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return { races, loading };
};

export default useRaceSchedule;