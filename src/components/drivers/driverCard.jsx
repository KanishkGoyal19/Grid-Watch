'use client';
import { driverTitles, currentChampion } from '@/data/wdcs';

const DriverCard = ({ driver }) => {
  if (!driver) return null;

  const titles = driverTitles[driver.full_name] || 0;
  const isChampion = driver.full_name === currentChampion;

  let imageUrl = driver.imageSlug;
    const isTopThree = driver.position <= 3;

    let cardClassName = "rounded-2xl p-4 shadow-lg flex items-start gap-4 w-full transition-transform hover:scale-105 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700";
    if (driver.teamColor) {
      cardClassName += ` border-l-4 border-[${driver.teamColor}]`;
    }

    let imageClassName = "w-28 h-28 rounded-xl object-cover border-2 border-gray-700";
    if (isTopThree) {
      imageClassName = "w-32 h-32 rounded-xl object-cover border-2 border-gray-700";
    }

    let nameClassName = "text-xl font-bold uppercase tracking-wide";
    if (isTopThree) {
      nameClassName = "text-2xl font-bold uppercase tracking-wide";
    }

    let positionClassName = "font-semibold";
    if (isTopThree) {
      positionClassName = "font-semibold text-yellow-400"
    }

    let pointsClassName = "font-semibold";
    if (isTopThree) {
      pointsClassName = "font-semibold text-green-400";
    }

    return (
      <div className={cardClassName}>
        <img
          src={imageUrl}
          alt={driver.full_name}
          onError={(e) => (e.currentTarget.src = '/default-driver.png')}
          className={imageClassName}
        />

        <div className="flex flex-col justify-between w-full">
          <div>
            <h2 className={nameClassName}>
              {driver.full_name}
            </h2>
            <div className="text-sm text-gray-300 mt-1 space-y-1">
              <p>
                Nationality: <span className="text-white">{driver.nationality || 'N/A'}</span>
              </p>
              <p>
                Driver No: <span className="text-white">{driver.driver_number}</span>
              </p>
              <p>
                Team: <span className="text-white">{driver.teamName || 'N/A'}</span>
              </p>
              {driver.position && (
                <p>
                  Position: <span className={positionClassName}>{driver.position}</span>
                </p>
              )}
              {driver.points && (
                <p>
                  Points: <span className={pointsClassName}>{driver.points}</span>
                </p>
              )}
            </div>
          </div>
          {driver.wins && (
            <div className="mt-3 text-sm text-gray-400 font-medium">
              Wins: <span className="font-semibold text-white">{driver.wins}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default DriverCard;
