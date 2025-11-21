import { communes, themes, users } from "../../../data";

const InterventionTable = ({ interventions, onEdit }) => {
  const getCommuneName = (id) => communes.find(c => c.id === id)?.nom || "—";
  const getThemeName = (id) => themes.find(t => t.id === id)?.nom || "—";
  const getAgentName = (id) => {
    const u = users.find(u => u.id === id);
    return u ? `${u.nom} ${u.prenom}` : "—";
  };

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg mt-4">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Commune</th>
            <th className="p-3">Thème</th>
            <th className="p-3">Usager</th>
            <th className="p-3">Statut</th>
            <th className="p-3">Créée le</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {interventions.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{getCommuneName(item.communeId)}</td>
              <td className="p-3">{getThemeName(item.themeId)}</td>
              <td className="p-3">{item.nomUsager} {item.prenomUsager}</td>
              <td className="p-3">{item.statut}</td>
              <td className="p-3">{item.dateCreation}</td>

              <td className="p-3">
                <button
                  onClick={() => onEdit(item.id)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InterventionTable;