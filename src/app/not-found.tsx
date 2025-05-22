export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url('/404.jpg')` }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-5xl font-extrabold mb-4">
          Looks like your session DNF'd
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Luckily this is not Red Bull Racing and we will not fire you
        </p>
        <a
          href="/"
          className="text-[#e10600] underline font-semibold text-lg hover:opacity-80 transition"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}
