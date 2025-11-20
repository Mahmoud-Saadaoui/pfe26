import { useParams, useNavigate } from "react-router-dom";
import ThemeForm from "../../../components/admin/themes/ThemeForm";
import { themes } from "../../../data";

export default function EditThemePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const theme = themes.find((t) => t.id === Number(id));

  const handleSubmit = (data) => {
    navigate("/admin/themes");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Modifier le thème</h1>

      <ThemeForm defaultValues={theme} onSubmit={handleSubmit} />
    </div>
  );
}