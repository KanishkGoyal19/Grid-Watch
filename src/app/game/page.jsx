'use client';
import dynamic from 'next/dynamic';

const PredictionDragDrop = dynamic(() => import('@/components/predictionGame/dragDrop'), {
  ssr: false,
});

export default function GamePage() {
  return <PredictionDragDrop />;
}
