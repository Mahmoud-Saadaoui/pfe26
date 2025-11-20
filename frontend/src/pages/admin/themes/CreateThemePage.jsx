import { useNavigate } from "react-router-dom";
import ThemeForm from "../../../components/admin/themes/ThemeForm";

export default function CreateThemePage() {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    navigate("/admin/themes");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Créer un thème</h1>
      <ThemeForm onSubmit={handleSubmit} />
    </div>
  );
}