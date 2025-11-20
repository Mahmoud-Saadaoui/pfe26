import { useState } from "react";
import { FaHome, FaUsers, FaCity, FaFolder, FaClipboardList } from "react-icons/fa";

export default function Dashboard() {
  const [role, setRole] = useState("admin"); // admin | agent

  const menuAdmin = [
    { label: "Dashboard", icon: <FaHome />, link: "#" },
    { label: "Utilisateurs", icon: <FaUsers />, link: "#" },
    { label: "Communes", icon: <FaCity />, link: "#" },
    { label: "Thèmes", icon: <FaFolder />, link: "#" },
    { label: "Interventions", icon: <FaClipboardList />, link: "#" }
  ];

  const menuAgent = [
    { label: "Dashboard", icon: <FaHome />, link: "#" },
    { label: "Interventions", icon: <FaClipboardList />, link: "#" }
  ];

  const menu = role === "admin" ? menuAdmin : menuAgent;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl p-4 hidden md:flex flex-col rounded-r-2xl">
        <h1 className="text-2xl font-extrabold text-blue-600 dark:text-purple-400 mb-6">Panel</h1>

        <nav className="flex flex-col gap-3">
          {menu.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 shadow hover:shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-all cursor-pointer"
            >
              <span className="text-xl text-blue-600 dark:text-purple-400">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* MOBILE SIDEBAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg flex justify-around py-3">
        {menu.map((item, i) => (
          <button key={i} className="flex flex-col items-center text-gray-700 dark:text-gray-200">
            <span className="text-2xl text-blue-600 dark:text-purple-400">{item.icon}</span>
            <small>{item.label}</small>
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 dark:text-purple-300">Bienvenue 👋</h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Ceci est un Dashboard moderne, responsive et attractif, adapté selon le rôle de l'utilisateur.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example cards */}
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-semibold">Statistique 1</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Description de statistique.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-semibold">Statistique 2</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Description de statistique.</p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-xl font-semibold">Statistique 3</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Description de statistique.</p>
          </div>
        </div>
      </main>
    </div>
  );
}