import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../../../components/admin/users/UserForm";
import { users } from "../../../data";

export default function EditUserPage() {
  const { id } = useParams();
  // const { users, updateUser } = useUsers();
  const navigate = useNavigate();
  const user = users.find(u => u.id === Number(id));

  if (!user) return <p>Utilisateur introuvable.</p>;

  const handleSubmit = async (data) => {
    // await updateUser(user.id, data);
    navigate("/admin/users");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Modifier l’utilisateur</h1>
      <UserForm defaultValues={user} onSubmit={handleSubmit} />
    </div>
  );
}
