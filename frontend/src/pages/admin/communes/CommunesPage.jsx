import { Link } from "react-router-dom";
import CommuneTable from "../../../components/admin/communes/CommuneTable";

export default function CommunesPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Communes</h1>

        <Link
          to="create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Ajouter une commune
        </Link>
      </div>

      <CommuneTable />
    </div>
  );
}