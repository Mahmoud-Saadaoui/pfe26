import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InterventionForm from "../../components/agent/interventions/InterventionForm";

const dummy = {
  id: 1,
  communeId: 1,
  themeId: 3,
  utilisateurId: 2,
  nomUsager: "Ahmed",
  prenomUsager: "Ali",
  question: "Problème fiscal...",
  statut: "En cours",
};

const EditInterventionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(dummy);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intervention mise à jour :", formData);
    navigate("/agent/interventions");
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Modifier intervention #{id}</h1>

      <InterventionForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Mettre à jour"
      />
    </div>
  );
};

export default EditInterventionPage;