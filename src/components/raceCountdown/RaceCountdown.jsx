"use client";

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

const EVENT_ORDER = [
  { key: 'FirstPractice', label: 'Free Practice 1' },
  { key: 'SecondPractice', label: 'Free Practice 2' },
  { key: 'SprintQualifying', label: 'Sprint Qualifying' },
  { key: 'Sprint', label: 'Sprint' },
  { key: 'ThirdPractice', label: 'Free Practice 3' },
  { key: 'Qualifying', label: 'Qualifying' },
  { key: 'Race', label: 'Race' }
];

const getNextEvent = (races) => {
  const now = dayjs.utc();
  const upcoming = [];

  races.forEach(race => {
    EVENT_ORDER.forEach(({ key, label }) => {
      const session = key === 'Race' ? { date: race.date, time: race.time } : race[key];
      if (session?.date && session?.time) {
        const datetime = dayjs.utc(`${session.date}T${session.time}`);
        if (datetime.isAfter(now)) {
          upcoming.push({
            label,
            datetime,
            raceName: race.raceName
          });
        }
      }
    });
  });

  upcoming.sort((a, b) => a.datetime.diff(b.datetime));
  return upcoming[0] || null;
};

const RaceCountdown = ({ races }) => {
  const [nextEvent, setNextEvent] = useState(null);
  const [timeParts, setTimeParts] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!races || races.length === 0) return;

    const updateEvent = () => {
      const event = getNextEvent(races);
      setNextEvent(event);
      return event;
    };

    let current = updateEvent();

    const interval = setInterval(() => {
      const now = dayjs.utc();
      if (current?.datetime.diff(now) <= 0) {
        current = updateEvent(); // move to next
      } else {
        const d = dayjs.duration(current.datetime.diff(now));
        setTimeParts({
          days: d.days(),
          hours: d.hours(),
          minutes: d.minutes(),
          seconds: d.seconds()
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [races]);

  if (!nextEvent) return <div className="text-white text-center">Loading race countdown...</div>;

return (
  <div className="bg-[#121212] text-white rounded-lg px-6 py-5 inline-block border border-gray-800 w-[360px]">
    <div className="text-center text-sm font-bold tracking-wide text-white mb-4">
      GRAND PRIX WEEKEND
    </div>
    <div className="flex space-x-4 justify-center items-center">
      {[
        { label: 'DAYS', value: timeParts.days },
        { label: 'HRS', value: timeParts.hours },
        { label: 'MINS', value: timeParts.minutes },
        { label: 'SECS', value: timeParts.seconds }
      ].map(({ label, value }, index, arr) => (
        <div
          key={label}
          className="flex flex-col items-center px-2 min-w-[60px] relative"
        >
          <div className="text-3xl font-extrabold tabular-nums">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs font-semibold mt-2 tracking-widest text-white font-mono">
            {label}
          </div>
          {index !== arr.length - 1 && (
            <div className="absolute h-6 w-px bg-gray-700 left-full top-1/2 transform -translate-y-1/2"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);



};

export default RaceCountdown;