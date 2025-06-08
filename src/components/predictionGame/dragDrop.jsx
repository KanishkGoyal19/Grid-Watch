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
    border: '1px solid #ccc',
    padding: '8px',
    margin: '4px',
    borderRadius: '8px',
    width: '120px',
    backgroundColor: '#fff',
    cursor: 'grab',
    textAlign: 'center',
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
      className={`w-32 h-32 border-2 rounded-lg flex items-center justify-center bg-gray-900 text-white ${
        isOver ? 'border-green-500' : 'border-gray-600'
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
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Predict the Podium</h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Droppable Slots */}
        <div className="flex gap-6 mb-10 justify-center">
          <DroppableSlot id="first" assignedDriver={slots.first} />
          <DroppableSlot id="second" assignedDriver={slots.second} />
          <DroppableSlot id="third" assignedDriver={slots.third} />
        </div>

        {/* Draggable Drivers */}
        <div className="flex flex-wrap gap-4">
          {drivers.map((driver) => (
            <DraggableDriver key={driver.full_name} driver={driver} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
