import CommuneRow from "./CommuneRow";
import { communes } from "../../../data";

export default function CommuneTable() {
  const deleteCommune = (id) => {
    communes = communes.filter((commune) => commune.id !== id);
  };
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom de la commune</th>
            <th className="p-2">Code Postal</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {communes.map((commune) => (
            <CommuneRow
              key={commune.id}
              commune={commune}
              onDelete={() => deleteCommune(commune.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}