"use client";
import RaceCountdownContainer from '../RaceCountdown/RaceCountdownContainer';

export default function HeroSection() {
  return (
    <section
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/Background.jpg')` }} // replace with your actual image path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to GridWatch
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          The free and fun F1 prediction companion. No betting. No subscriptions. Just pure racing knowledge and competition.
        </p>
      </div>
      <RaceCountdownContainer />
    </section>
  );
}
