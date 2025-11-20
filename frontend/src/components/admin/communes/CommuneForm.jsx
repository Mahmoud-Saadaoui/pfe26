import { useState } from "react";

export default function CommuneForm({ defaultValues = {}, onSubmit }) {
  const [form, setForm] = useState({
    nom: defaultValues.nom || "",
    codePostal: defaultValues.codePostal || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1">Nom de la commune</label>
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Code Postal</label>
        <input
          name="codePostal"
          value={form.codePostal}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </form>
  );
}