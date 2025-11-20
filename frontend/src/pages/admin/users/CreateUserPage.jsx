import UserForm from "../../../components/admin/users/UserForm";
import { useNavigate } from "react-router-dom";

export default function CreateUserPage() {
  // const { createUser } = useUsers();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // await createUser(data);
    navigate("/admin/users");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Créer un utilisateur</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}