const Theme = require("../models/Theme"); // Sequelize model
const { validationResult } = require("express-validator");

// Static array for immediate frontend use
let themes = [
  { id: 1, nom: "Mariage" },
  { id: 2, nom: "Héritage" },
  { id: 3, nom: "Fiscalité" },
  { id: 4, nom: "Urbanisme" },
  { id: 5, nom: "Droits sociaux" },
  { id: 6, nom: "Contrats" },
  { id: 7, nom: "Commerce" },
  { id: 8, nom: "Litiges" },
];
let nextId = 9;

// -------------------
// Get all themes
// -------------------
exports.getAll = async (req, res, next) => {
  try {
    // Try to get from DB if available
    const dbThemes = await Theme.findAll().catch(() => null);

    // If DB returns data, use it; otherwise fallback to static array
    res.json(dbThemes?.length ? dbThemes : themes);
  } catch (error) {
    next(error);
  }
};

// -------------------
// Create a new theme
// -------------------
exports.create = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ success: false, message: "Le nom est requis" });

    // Add to static array
    const newTheme = { id: nextId++, nom };
    themes.push(newTheme);

    // Optional: try saving to DB
    await Theme.create({ nom }).catch(() => null);

    res.status(201).json({ success: true, id: newTheme.id, message: "Theme created" });
  } catch (error) {
    next(error);
  }
};

// -------------------
// Update theme
// -------------------
exports.update = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

  try {
    const id = parseInt(req.params.id);
    const { nom } = req.body;

    // Update in static array
    const theme = themes.find(t => t.id === id);
    if (!theme) return res.status(404).json({ success: false, message: "Theme not found" });
    theme.nom = nom || theme.nom;

    // Optional: update in DB
    const dbTheme = await Theme.findByPk(id).catch(() => null);
    if (dbTheme) await dbTheme.update({ nom }).catch(() => null);

    res.json({ success: true, message: "Theme updated" });
  } catch (error) {
    next(error);
  }
};

// -------------------
// Delete theme
// -------------------
exports.delete = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    // Remove from static array
    const index = themes.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ success: false, message: "Theme not found" });
    themes.splice(index, 1);

    // Optional: remove from DB
    const dbTheme = await Theme.findByPk(id).catch(() => null);
    if (dbTheme) await dbTheme.destroy().catch(() => null);

    res.json({ success: true, message: "Theme deleted" });
  } catch (error) {
    next(error);
  }
};
