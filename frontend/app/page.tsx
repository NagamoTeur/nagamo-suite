"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-50 flex flex-col items-center justify-center overflow-hidden">
      {/* ✅ Forme en SVG (effet Apple-like) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-30"></div>

      {/* ✅ Titre principal */}
      <h1 className="text-5xl font-extrabold text-gray-900 z-10 text-center">
        Découvrez <span className="text-indigo-600">Nagamo Suite</span>
      </h1>

      {/* ✅ Sous-titre */}
      <p className="mt-4 text-lg text-gray-700 max-w-xl text-center z-10">
        La solution SaaS intuitive et performante qui optimise la gestion de vos installations.
      </p>

      {/* ✅ Bouton Call-to-Action */}
      <Link href="/auth/signup">
        <button className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-transform">
          Démarrer maintenant
        </button>
      </Link>
    </div>
  );
}

