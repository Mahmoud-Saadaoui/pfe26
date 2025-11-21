// pages/agent/AgentDashboard.jsx
import { FiCheckCircle, FiClock, FiAlertTriangle } from "react-icons/fi";

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Agent Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiCheckCircle size={30} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Interventions effectuées</p>
            <p className="text-xl font-bold">8</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiClock size={30} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">En attente</p>
            <p className="text-xl font-bold">3</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiAlertTriangle size={30} className="text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Urgences</p>
            <p className="text-xl font-bold">1</p>
          </div>
        </div>
      </div>

      {/* Planning du jour */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Interventions d'aujourd'hui</h2>

        <ul className="space-y-3">
          <li className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <strong>ID-302</strong> • Tribunal de Tunis • 09h00
          </li>
          <li className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <strong>ID-308</strong> • Commune Sousse • 12h00
          </li>
          <li className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <strong>ID-310</strong> • Tribunal Nabeul • 15h00
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AgentDashboard;