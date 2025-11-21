import { communes, themes, users } from "../../../data";


const InterventionForm = ({ formData, onChange, onSubmit, submitLabel }) => {
  const agents = users.filter(u => u.role === "agent");

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow p-6 rounded-lg max-w-2xl mx-auto space-y-4"
    >
      {/* Commune */}
      <div>
        <label className="block mb-1 font-medium">Commune</label>
        <select
          name="communeId"
          value={formData.communeId}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner une commune</option>
          {communes.map(c => (
            <option key={c.id} value={c.id}>{c.nom}</option>
          ))}
        </select>
      </div>

      {/* Thème */}
      <div>
        <label className="block mb-1 font-medium">Thème</label>
        <select
          name="themeId"
          value={formData.themeId}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner un thème</option>
          {themes.map(t => (
            <option key={t.id} value={t.id}>{t.nom}</option>
          ))}
        </select>
      </div>

      {/* Agent */}
      <div>
        <label className="block mb-1 font-medium">Assigné à (agent)</label>
        <select
          name="utilisateurId"
          value={formData.utilisateurId}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionner un agent</option>
          {agents.map(a => (
            <option key={a.id} value={a.id}>
              {a.nom} {a.prenom}
            </option>
          ))}
        </select>
      </div>

      {/* Usager */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Nom Usager</label>
          <input
            type="text"
            name="nomUsager"
            value={formData.nomUsager}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-medium">Prénom Usager</label>
          <input
            type="text"
            name="prenomUsager"
            value={formData.prenomUsager}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Question */}
      <div>
        <label className="block mb-1 font-medium">Question</label>
        <textarea
          name="question"
          value={formData.question}
          onChange={onChange}
          rows={4}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Statut */}
      <div>
        <label className="block mb-1 font-medium">Statut</label>
        <select
          name="statut"
          value={formData.statut}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option value="En cours">En cours</option>
          <option value="Traitée">Traitée</option>
          <option value="Archivée">Archivée</option>
        </select>
      </div>

      {/* Pièces jointes */}
      <div>
        <label className="block mb-1 font-medium">Pièce jointe</label>
        <input
          type="file"
          name="file"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default InterventionForm;