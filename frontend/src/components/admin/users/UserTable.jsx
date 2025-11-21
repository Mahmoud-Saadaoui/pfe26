import { users } from "../../../data";
import UserRow from "./UserRow";

export default function UserTable() {
  const deleteUser = (id) => {
    console.log(`Supprimer l'utilisateur ${id}`);
  };
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Prénom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              onDelete={() => deleteUser(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}