import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InterventionForm from "../../components/agent/interventions/InterventionForm";

const CreateInterventionPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    communeId: "",
    themeId: "",
    utilisateurId: "",
    nomUsager: "",
    prenomUsager: "",
    question: "",
    statut: "En cours",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intervention créée :", formData);
    navigate("/agent/interventions");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Créer une intervention</h1>

      <InterventionForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Créer"
      />
    </div>
  );
};

export default CreateInterventionPage;
