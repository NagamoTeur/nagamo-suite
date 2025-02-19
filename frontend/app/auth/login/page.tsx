"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "❌ Une erreur est survenue lors de la connexion.");
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("storage"));
      router.push("/member");
    } catch (error) {
      setError("❌ Impossible de se connecter au serveur.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ✅ Forme en arrière-plan (Apple-like) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-30"></div>

      {/* ✅ Formulaire avec effet de flou */}
      <div className="max-w-md w-full p-8 rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">Connexion</h1>
        <p className="text-gray-500 text-center mt-2">Accédez à votre compte</p>
        {error && <div className="mt-4 text-center text-sm text-red-600">{error}</div>}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
          <button type="submit" className="w-full btn-primary">Se connecter</button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/auth/signup"><span className="text-blue-600 hover:underline">Pas encore inscrit ? Créez un compte</span></Link>
        </div>
      </div>
    </div>
  );
}

