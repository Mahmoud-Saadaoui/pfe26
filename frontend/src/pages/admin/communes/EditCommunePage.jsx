import { useParams, useNavigate } from "react-router-dom";
import { communes } from "../../../data";
import CommuneForm from "../../../components/admin/communes/CommuneForm";

export default function EditCommunePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const commune = communes.find((c) => c.id === Number(id));

  if (!commune) return <p>Commune introuvable.</p>;

  const handleSubmit = async (data) => {
    await updateCommune(commune.id, data);
    navigate("/admin/communes");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Modifier la commune
      </h1>

      <CommuneForm defaultValues={commune} onSubmit={handleSubmit} />
    </div>
  );
}