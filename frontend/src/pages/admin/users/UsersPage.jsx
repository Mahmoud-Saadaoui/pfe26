// pages/admin/Users.jsx

import { Link } from "react-router-dom";
import UserTable from "../../../components/admin/users/UserTable";

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Utilisateurs</h1>

        <Link
          to="create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Ajouter
        </Link>
      </div>

      <UserTable />
    </div>
  );
}