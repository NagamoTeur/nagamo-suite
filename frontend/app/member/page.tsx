"use client";
import { useState, useEffect } from "react";

export default function MemberPage() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-lg w-full bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-bold">Mon Compte</h2>
        {user && (
          <div className="mt-4 space-y-4">
            <p><strong>Nom :</strong> {editMode ? <input type="text" value={name} className="input" onChange={(e) => setName(e.target.value)} /> : user.name}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <button className="btn-primary" onClick={() => setEditMode(!editMode)}>
              {editMode ? "Sauvegarder" : "Modifier"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

