import { Link } from "react-router-dom";
import ThemeTable from "../../../components/admin/themes/ThemeTable";

export default function ThemesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Gestion des thèmes</h1>

        <Link
          to="create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Ajouter un thème
        </Link>
      </div>

      <ThemeTable />
    </div>
  );
}