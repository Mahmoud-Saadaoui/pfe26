import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const AgentSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="md:hidden p-3" onClick={() => setOpen(!open)}>
        <FiMenu size={24} />
      </button>

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
        <h2 className="text-xl font-bold mb-6">Agent Panel</h2>

        <nav className="space-y-3">
          <Link to="/agent" className="block hover:text-blue-600">
            Dashboard
          </Link>
          <Link to="/agent/interventions" className="block hover:text-blue-600">
            Interventions
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default AgentSidebar;