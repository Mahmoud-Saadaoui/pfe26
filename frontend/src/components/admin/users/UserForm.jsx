// src/components/users/UserForm.jsx
import { useState } from "react";

export default function UserForm({ defaultValues = {}, onSubmit }) {
  const [form, setForm] = useState({
    nom: defaultValues.nom || "",
    prenom: defaultValues.prenom || "",
    email: defaultValues.email || "",
    motDePasse: "",
    role: defaultValues.role || "agent",
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
        <label className="block mb-1">Nom</label>
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Prénom</label>
        <input
          name="prenom"
          value={form.prenom}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input"
          required
        />
      </div>

      {!defaultValues.id && (
        <div>
          <label className="block mb-1">Mot de passe</label>
          <input
            type="password"
            name="motDePasse"
            value={form.motDePasse}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      )}

      <div>
        <label className="block mb-1">Rôle</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input"
        >
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
    </form>
  );
}