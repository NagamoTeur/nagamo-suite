import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-6">
      <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">Oups, cette page n'existe pas !</h2>
      <p className="text-gray-600 mt-2">Il semble que vous vous soyez égaré...</p>
      <Link href="/" className="mt-6 btn-primary">Retour à l'accueil</Link>
    </div>
  );
}

