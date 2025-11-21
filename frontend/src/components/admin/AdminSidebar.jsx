import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden p-3"
        onClick={() => setOpen(!open)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static
          top-0 left-0
          h-full w-64
          bg-white shadow-md
          p-4
          transition-transform
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <Link className="block hover:text-blue-600" to="/admin">
            Dashboard
          </Link>
          <Link className="block hover:text-blue-600" to="/admin/users">
            Utilisateurs
          </Link>
          <Link className="block hover:text-blue-600" to="/admin/communes">
            Communes
          </Link>
          <Link className="block hover:text-blue-600" to="/admin/themes">
            Thèmes
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;