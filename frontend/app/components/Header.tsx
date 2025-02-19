"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 cursor-pointer">
            Nagamo Suite
          </span>
        </Link>

        <nav className="flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/member" className="text-gray-700 font-medium hover:text-blue-600">
                Bienvenue, {user.name}
              </Link>
              {user.role === "admin" && (
                <Link href="/admin" className="text-red-500 font-medium hover:text-red-700">
                  Administration
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-700 font-medium hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Inscription
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

