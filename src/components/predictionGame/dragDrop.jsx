'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useDriverData } from '@/context/DriverDataContext';
import { useState } from 'react';

function DraggableDriver({ driver }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: driver.full_name,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    border: '1px solid #374151', // border-gray-700
    padding: '8px',
    margin: '4px',
    borderRadius: '16px', // rounded-2xl
    width: '120px',
    background: 'linear-gradient(to bottom right, #1f2937, #111827)', // from-gray-800 to-gray-900
    cursor: 'grab',
    textAlign: 'center',
    color: '#fff', // text-white
    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.25)', // shadow-lg
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img
        src={driver.imageSlug}
        alt={driver.full_name}
        className="w-16 h-16 object-cover rounded-full mx-auto mb-1"
        onError={(e) => (e.currentTarget.src = '/default-driver.png')}
      />
      <div className="text-sm font-semibold">{driver.full_name}</div>
    </div>
  );
}

function DroppableSlot({ id, assignedDriver }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-32 border-2 rounded-lg flex items-center justify-center bg-gray-900 text-white ${isOver ? 'border-green-500' : 'border-gray-600'
        }`}
    >
      {assignedDriver ? (
        <div className="text-center">
          <img
            src={assignedDriver.imageSlug}
            className="w-16 h-16 object-cover rounded-full mx-auto"
            alt={assignedDriver.full_name}
            onError={(e) => (e.currentTarget.src = '/default-driver.png')}
          />
          <p className="text-xs mt-1">{assignedDriver.full_name}</p>
        </div>
      ) : (
        <p className="text-sm">Drop here</p>
      )}
    </div>
  );
}

export default function PredictionDragDrop() {
  const { drivers, loading } = useDriverData();
  const [slots, setSlots] = useState({
    first: null,
    second: null,
    third: null,
    fastestLap: null,
    dnf1: null,
    dnf2: null,
  });

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over && active) {
      const droppedDriver = drivers.find((d) => d.full_name === active.id);
      setSlots((prev) => ({ ...prev, [over.id]: droppedDriver }));
    }
  };

  if (loading) return <div className="text-white">Loading drivers...</div>;

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <h1 className="text-3xl font-bold p-8">Race Predictions</h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

        {/* Scrollable prediction categories */}
        <div className="flex-1 overflow-y-auto p-8 pb-40 space-y-10">

          {/* Podium */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Podium</h2>
            <div className="flex gap-6">
              <DroppableSlot id="first" assignedDriver={slots.first} />
              <DroppableSlot id="second" assignedDriver={slots.second} />
              <DroppableSlot id="third" assignedDriver={slots.third} />
            </div>
          </section>

          {/* Fastest Lap */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Fastest Lap</h2>
            <DroppableSlot id="fastestLap" assignedDriver={slots.fastestLap} />
          </section>

          {/* DNF Predictions */}
          <section>
            <h2 className="text-xl font-semibold mb-4">DNF Predictions</h2>
            <div className="flex gap-6">
              <DroppableSlot id="dnf1" assignedDriver={slots.dnf1} />
              <DroppableSlot id="dnf2" assignedDriver={slots.dnf2} />
            </div>
          </section>

        </div>

        {/* Fixed Bottom Driver Pool */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 max-h-48 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {drivers.map((driver) => (
              <DraggableDriver key={driver.fucrell_name} driver={driver} />
            ))}
          </div>
        </div>


      </DndContext>
    </div>
  );
}

