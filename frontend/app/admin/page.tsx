"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, adminCount: 0, userCount: 0 });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/404"); 
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.role !== "admin") {
      router.push("/404");
      return;
    }

    const token = localStorage.getItem("access_token");
    fetch("http://localhost:3001/user/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          const adminCount = data.filter(user => user.role === "admin").length;
          const userCount = data.length - adminCount;
          setStats({ totalUsers: data.length, adminCount, userCount });
        }
      })
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, []);

  const updateUserRole = (id: number, newRole: string) => {
    const token = localStorage.getItem("access_token");
    fetch(`http://localhost:3001/user/update-role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role: newRole }),
    })
      .then(() => {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? { ...user, role: newRole } : user));
      })
      .catch(error => console.error("Erreur lors de la mise à jour du rôle :", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Administration</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold">Total Utilisateurs</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold">Admins</h2>
          <p className="text-2xl font-bold text-red-500">{stats.adminCount}</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold">Utilisateurs</h2>
          <p className="text-2xl font-bold text-blue-500">{stats.userCount}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6">Liste des membres</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {users.map((user: any) => (
          <div key={user.id} className="p-4 bg-white shadow-lg rounded-lg card">
            <h3 className="text-md font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
            <p className={`text-sm ${user.role === "admin" ? "text-red-500" : "text-gray-500"}`}>
              {user.role}
            </p>
            <select
              className="mt-2 p-2 border rounded"
              value={user.role}
              onChange={(e) => updateUserRole(user.id, e.target.value)}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

