import { Link } from "react-router-dom";

export default function Header() {
  const user = {
    nom: "Ahmed",
    role: "admin",
  };

  const logout = () => {
    console.log("logout");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl">
        Bienvenue, {user?.nom}
      </h1>

      <div className="flex items-center gap-4">
        {user?.role === "admin" && (
          <Link to="/agent">Dashboard Agent</Link>
        )}

        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}