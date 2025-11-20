const express = require("express")
const router = express.Router()

// Import du contrôleur des interventions
const interventionController = require("../controllers/interventionController")

// Middleware pour vérifier le token JWT
const { verifyToken } = require("../middlewares/authMiddleware")

// Pour valider les champs de la requête
const { body } = require("express-validator")

// Appliquer le middleware d'authentification à toutes les routes
router.use(verifyToken)

// Route pour récupérer toutes les interventions
router.get("/", interventionController.getAll)

// Route pour créer une nouvelle intervention avec validation des champs
router.post(
  "/",
  [body("titre").notEmpty(), body("description").notEmpty(), body("commune_id").isInt(), body("theme_id").isInt()],
  interventionController.create,
)

// Route pour mettre à jour une intervention existante avec validation des champs
router.put("/:id", [body("titre").notEmpty(), body("description").notEmpty()], interventionController.update)

// Route pour répondre à une intervention
router.patch("/:id/reponse", interventionController.respond)

// Route pour mettre à jour le statut d'une intervention
router.patch("/:id/statut", interventionController.updateStatus)

// Route pour ajouter une pièce jointe à une intervention
router.post("/:id/piece-jointe", interventionController.uploadAttachment)

// Export du router
module.exports = router
