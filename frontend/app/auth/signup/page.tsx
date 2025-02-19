"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("⚠️ Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Erreur lors de l'inscription.");
      } else {
        setMessage("✅ Inscription réussie ! Redirection...");
        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (error) {
      setMessage("❌ Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ✅ Forme en arrière-plan (Apple-like) */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[90vw] h-[50vh] bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full blur-3xl opacity-30"></div>

      {/* ✅ Formulaire avec effet de flou */}
      <div className="max-w-md w-full p-8 rounded-lg bg-white/30 backdrop-blur-md shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Inscription</h2>
        <p className="text-gray-500 text-center mt-2">Rejoignez Nagamo Suite dès maintenant</p>
        {message && <div className="text-center mt-4 text-sm text-red-600">{message}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom complet" className="input" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" className="input" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" className="input" required />
          <button type="submit" className="w-full btn-primary">S'inscrire</button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/auth/login">
            <span className="text-blue-600 hover:underline">Déjà inscrit ? Connectez-vous</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

