import React from "react";
import ThemeRow from "./ThemeRow";
import { themes } from "../../../data";

function ThemeTable() {
  const deleteTheme = () => {
    console.log("deleted")
  }
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom du thème</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {themes.map((t) => (
            <ThemeRow key={t.id} theme={t} onDelete={deleteTheme} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ThemeTable);