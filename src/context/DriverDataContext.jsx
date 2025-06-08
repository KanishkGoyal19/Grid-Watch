'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DriverDataContext = createContext();

export const DriverDataProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const driverIdMap = {
    'max_verstappen': 'verstappen',
    // Extend as needed
  };

  const getDriverIdFromFullName = (fullName) => {
    const parts = fullName.split(' ');
    const last = parts[parts.length - 1].toLowerCase();
    const first = parts[0].toLowerCase();
    return first === 'max' && last === 'verstappen' ? 'verstappen' : last;
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [driverRes, standingsRes] = await Promise.all([
          fetch('https://api.openf1.org/v1/drivers?meeting_key=latest&session_key=latest'),
          fetch('https://api.jolpi.ca/ergast/f1/2025/driverstandings/')
        ]);

        if (!driverRes.ok || !standingsRes.ok) throw new Error('Fetch error');

        const driversData = await driverRes.json();
        const standingsData = await standingsRes.json();
        const rawStandings = standingsData?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || [];

        const formattedDrivers = driversData.map(driver => ({
          full_name: driver.full_name,
          driver_number: driver.driver_number,
          nationality: driver.country_code,
          code: driver.name_acronym,
          driverId: getDriverIdFromFullName(driver.full_name),
          imageSlug: driver.headshot_url,
          teamName: driver.team_name,
          teamColor: driver.team_colour
        }));

        // Merge standings into driver data
        const merged = formattedDrivers.map(driver => {
          const matching = rawStandings.find(s => {
            const ergastId = s.Driver.driverId;
            const mapped = driverIdMap[ergastId] || ergastId;
            return mapped === driver.driverId;
          });

          return {
            ...driver,
            position: matching?.position,
            points: matching?.points,
            wins: matching?.wins,
          };
        });

        setDrivers(merged);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <DriverDataContext.Provider value={{ drivers, loading, error }}>
      {children}
    </DriverDataContext.Provider>
  );
};

export const useDriverData = () => useContext(DriverDataContext);
