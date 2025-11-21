import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";

export default function Header() {
  const {auth} = useContext(AppContext)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate("/")
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-lg text-zinc-600">
        <span className="font-bold text-zinc-700">Bienvenue</span> {auth?.user.nom}
      </h1>

      <div className="flex items-center gap-4">
        {auth?.user.role === "ADMIN" && (
          <Link to="/agent" className="text-sm hover:text-blue-900 hover:font-bold">Dashboard Agent</Link>
        )}

        <button
          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}