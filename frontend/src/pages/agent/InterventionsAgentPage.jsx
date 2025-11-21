import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InterventionTable from "../../components/agent/interventions/InterventionTable";

const dummyInterventions = [
  {
    id: 1,
    communeId: 1,
    themeId: 3,
    utilisateurId: 2,
    nomUsager: "Ahmed",
    prenomUsager: "Ali",
    question: "Problème fiscal...",
    reponse: "",
    statut: "En cours",
    dateCreation: "2025-01-10",
  },
  {
    id: 2,
    communeId: 4,
    themeId: 2,
    utilisateurId: 3,
    nomUsager: "Sarra",
    prenomUsager: "Med",
    question: "Héritage question...",
    reponse: "",
    statut: "Traitée",
    dateCreation: "2025-01-11",
  }
];

const InterventionsAgentPage = () => {
  const navigate = useNavigate();
  const [interventions] = useState(dummyInterventions);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Liste des interventions</h1>

        <button
          onClick={() => navigate("create")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Créer intervention
        </button>
      </div>

      <InterventionTable
        interventions={interventions}
        onEdit={(id) => navigate(`${id}/edit`)}
      />
    </div>
  );
};

export default InterventionsAgentPage;