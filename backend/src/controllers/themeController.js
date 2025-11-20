// Import du modèle Theme pour accéder à la base de données
const Theme = require("../models/Theme")
// Import de la fonction validationResult pour vérifier les erreurs de validation des requêtes
const { validationResult } = require("express-validator")

// -------------------
// Récupérer tous les thèmes
// -------------------
exports.getAll = async (req, res, next) => {
  try {
    // Appel à la méthode du modèle pour récupérer tous les thèmes
    const themes = await Theme.findAll()
    // Retourne les thèmes au format JSON
    res.json(themes)
  } catch (error) {
    // Si erreur, passe l'erreur au middleware de gestion d'erreurs
    next(error)
  }
}

// -------------------
// Créer un nouveau thème
// -------------------
exports.create = async (req, res, next) => {
  // Vérifie si la requête contient des erreurs de validation
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      errors: errors.array(), // Retourne un tableau d'erreurs de validation
    })

  try {
    // Appel à la méthode create du modèle avec les données envoyées dans le corps de la requête
    const id = await Theme.create(req.body)
    // Retourne un message de succès avec l'id du thème créé
    res.status(201).json({ success: true, id, message: "Theme created" })
  } catch (error) {
    // Si erreur, passe l'erreur au middleware de gestion d'erreurs
    next(error)
  }
}

// -------------------
// Mettre à jour un thème existant
// -------------------
exports.update = async (req, res, next) => {
  // Vérifie si la requête contient des erreurs de validation
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      errors: errors.array(), // Retourne les erreurs de validation
    })

  try {
    // Appel à la méthode update du modèle avec l'id du thème à mettre à jour et les nouvelles données
    await Theme.update(req.params.id, req.body)
    // Retourne un message de succès
    res.json({ success: true, message: "Theme updated" })
  } catch (error) {
    // Si erreur, passe l'erreur au middleware de gestion d'erreurs
    next(error)
  }
}

// -------------------
// Supprimer un thème
// -------------------
exports.delete = async (req, res, next) => {
  try {
    // Appel à la méthode delete du modèle avec l'id du thème à supprimer
    await Theme.delete(req.params.id)
    // Retourne un message de succès
    res.json({ success: true, message: "Theme deleted" })
  } catch (error) {
    // Si erreur, passe l'erreur au middleware de gestion d'erreurs
    next(error)
  }
}
