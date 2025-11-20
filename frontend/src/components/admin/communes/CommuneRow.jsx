import { Link } from "react-router-dom";
import React from "react";

function CommuneRow({ commune, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2">{commune.nom}</td>
      <td className="p-2">{commune.codePostal}</td>

      <td className="p-2 flex gap-3">
        <Link
          to={`${commune.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Modifier
        </Link>

        <button
          onClick={() => onDelete(commune.id)}
          className="text-red-600 hover:underline"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}

export default React.memo(CommuneRow);