const Intervention = require("../models/Intervention")
const { validationResult } = require("express-validator")

// -------------------
// Récupérer toutes les interventions
// -------------------
exports.getAll = async (req, res, next) => {
  try {
    const interventions = await Intervention.findAll() // Récupère toutes les interventions depuis la base
    res.json(interventions)
  } catch (error) {
    next(error) // Passe l'erreur au middleware de gestion des erreurs
  }
}

// -------------------
// Créer une nouvelle intervention
// -------------------
exports.create = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) 
    return res.status(400).json({ success: false, errors: errors.array() }) // Retourne les erreurs de validation

  try {
    const id = await Intervention.create(req.body) // Crée une intervention dans la base
    res.status(201).json({ success: true, id, message: "Intervention created" })
  } catch (error) {
    next(error)
  }
}

// -------------------
// Mettre à jour une intervention existante
// -------------------
exports.update = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) 
    return res.status(400).json({ success: false, errors: errors.array() })

  try {
    await Intervention.update(req.params.id, req.body) // Met à jour l'intervention par son ID
    res.json({ success: true, message: "Intervention updated" })
  } catch (error) {
    next(error)
  }
}

// -------------------
// Mettre à jour le statut d'une intervention
// -------------------
exports.updateStatus = async (req, res, next) => {
  const { statut } = req.body
  if (!["New", "In Progress", "Processed", "Archived"].includes(statut)) {
    return res.status(400).json({ success: false, message: "Invalid status" }) // Vérifie que le statut est valide
  }

  try {
    await Intervention.updateStatus(req.params.id, statut) // Met à jour le statut dans la base
    res.json({ success: true, message: "Status updated" })
  } catch (error) {
    next(error)
  }
}

// -------------------
// Ajouter une réponse à une intervention
// -------------------
exports.respond = async (req, res, next) => {
  const { reponse } = req.body
  if (!reponse) return res.status(400).json({ success: false, message: "Response is required" })

  try {
    await Intervention.addResponse(req.params.id, {
      reponse,
      utilisateur_id: req.user.id, // Associe la réponse à l'utilisateur connecté
    })
    res.json({ success: true, message: "Response added" })
  } catch (error) {
    next(error)
  }
}

// -------------------
// Ajouter une pièce jointe à une intervention
// -------------------
exports.uploadAttachment = async (req, res, next) => {
  // Dans une vraie application, utiliser multer pour gérer les fichiers
  // Ici, on suppose que le chemin du fichier est fourni dans req.body.filePath
  const { filePath } = req.body

  try {
    await Intervention.addAttachment(req.params.id, filePath) // Ajoute le fichier à l'intervention
    res.json({ success: true, message: "Attachment added" })
  } catch (error) {
    next(error)
  }
}
