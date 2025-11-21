import { useNavigate } from "react-router-dom";
import CommuneForm from "../../../components/admin/communes/CommuneForm";

export default function CreateCommunePage() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/admin/communes");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Ajouter une commune</h1>
      <CommuneForm onSubmit={handleSubmit} />
    </div>
  );
}
