// pages/admin/AdminDashboard.jsx
import { FiUsers, FiSettings, FiBarChart2 } from "react-icons/fi";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiUsers size={30} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total utilisateurs</p>
            <p className="text-xl font-bold">148</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiSettings size={30} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paramètres modifiés</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center gap-4">
          <FiBarChart2 size={30} className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Statistiques du mois</p>
            <p className="text-xl font-bold">+28%</p>
          </div>
        </div>
      </div>

      {/* Section récente */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Activités récentes</h2>
        <ul className="space-y-2 text-gray-700">
          <li>• Nouvel utilisateur créé : <strong>Agent 23</strong></li>
          <li>• Commune “Sousse” ajoutée</li>
          <li>• Intervention ID-203 approuvée</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;