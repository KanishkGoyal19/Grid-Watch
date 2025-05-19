'use client';
import { useEffect, useState } from 'react';
import DriverCard from '@/components/drivers/driverCard';

// Mapping object for driverIds between Ergast and OpenF1 APIs
const driverIdMap = {
    'max_verstappen': 'verstappen',
    // Add other mappings if necessary
};

// Function to get the driverId from the full name.
const getDriverIdFromFullName = (fullName) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length > 1) {
        const lastName = nameParts[nameParts.length - 1].toLowerCase();
        const firstName = nameParts[0].toLowerCase();
        return firstName === 'max' && lastName === 'verstappen' ? 'verstappen' : lastName;
    }
    return fullName.toLowerCase();
};

const DriversPage = () => {
    const [drivers, setDrivers] = useState([]);
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driversResponse = await fetch('https://api.openf1.org/v1/drivers?meeting_key=latest&session_key=latest');
                if (!driversResponse.ok) {
                    throw new Error(`Failed to fetch drivers: ${driversResponse.status}`);
                }
                const driversData = await driversResponse.json();

                const formattedDrivers = driversData.map(driver => ({
                    full_name: driver.full_name,
                    driver_number: driver.driver_number,
                    dob: null,
                    nationality: driver.country_code,
                    wiki: null,
                    code: driver.name_acronym,
                    driverId: getDriverIdFromFullName(driver.full_name), // Derive driverId
                    imageSlug: driver.headshot_url,
                    teamName: driver.team_name,
                    teamColor: driver.team_colour
                }));
                setDrivers(formattedDrivers);

            } catch (error) {
                console.error('Error fetching drivers:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchStandings = async () => {
            try {
                const standingsResponse = await fetch('https://api.jolpi.ca/ergast/f1/2025/driverstandings/');
                if (!standingsResponse.ok) {
                    throw new Error(`Failed to fetch standings: ${standingsResponse.status}`);
                }
                const standingsData = await standingsResponse.json();
                const rawStandings = standingsData?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings || [];
                setStandings(rawStandings);
            } catch (error) {
                console.error('Error fetching standings:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
        fetchStandings();
    }, []);

    // Combine driver data with standings
    const driversWithStandings = drivers.map(driver => {
        const matchingStanding = standings.find(standingDriver => {
            // Use the mapping object to get the OpenF1 driverId
            const ergastDriverId = standingDriver.Driver.driverId;
            const openf1DriverId = driverIdMap[ergastDriverId] || ergastDriverId; // Default to ergastDriverId if no mapping
            return openf1DriverId === driver.driverId;
        });

        if (matchingStanding) {
            return {
                ...driver,
                position: matchingStanding.position,
                points: matchingStanding.points,
                wins: matchingStanding.wins,
            };
        }
        return driver;
    });

    // Sort drivers by their position in the standings
    const sortedDrivers = [...driversWithStandings].sort((a, b) => {
        const positionA = parseInt(a.position, 10);
        const positionB = parseInt(b.position, 10);

        if (isNaN(positionA)) return 1;
        if (isNaN(positionB)) return -1;

        return positionA - positionB;
    });

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

    return (
        <main className="min-h-screen bg-black p-8">
            <h1 className="text-white text-3xl font-bold mb-6">F1 Drivers</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {sortedDrivers.map(driver => (
                    <DriverCard key={driver.full_name} driver={driver} />
                ))}
            </div>
        </main>
    );
};

export default DriversPage;
