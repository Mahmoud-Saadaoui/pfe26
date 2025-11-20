import { Link } from "react-router-dom";
import React from "react";

function UserRow({ user, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2">{user.nom}</td>
      <td className="p-2">{user.prenom}</td>
      <td className="p-2">{user.email}</td>
      <td className="p-2 capitalize">{user.role}</td>

      <td className="p-2 flex gap-3">
        <Link
          to={`${user.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Modifier
        </Link>

        <button
          onClick={() => onDelete(user.id)}
          className="text-red-600 hover:underline"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}

export default React.memo(UserRow);