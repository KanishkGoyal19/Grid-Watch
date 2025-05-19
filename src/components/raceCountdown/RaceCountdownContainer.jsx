"use client";
import useRaceSchedule from '../../hooks/useRaceSchedule';
import RaceCountdown from './RaceCountdown';

const RaceCountdownContainer = () => {
  const { races, loading } = useRaceSchedule();

  if (loading) return <div className="text-center">Loading upcoming race…</div>;

  return <RaceCountdown races={races} />;
};

export default RaceCountdownContainer;
