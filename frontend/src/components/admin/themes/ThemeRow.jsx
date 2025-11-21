import React from "react";
import { Link } from "react-router-dom";

function ThemeRow({ theme, onDelete }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-2">{theme.nom}</td>

      <td className="p-2 flex gap-3">
        <Link
          to={`${theme.id}/edit`}
          className="text-blue-600 hover:underline"
        >
          Modifier
        </Link>

        <button
          onClick={() => onDelete(theme.id)}
          className="text-red-600 hover:underline"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
}

export default React.memo(ThemeRow);