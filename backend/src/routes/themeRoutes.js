const express = require("express")
const router = express.Router()
const themeController = require("../controllers/themeController")
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware")
const { body } = require("express-validator")

router.use(verifyToken)

router.get("/", themeController.getAll)

router.post("/", [isAdmin, body("titre").notEmpty(), body("description").optional()], themeController.create)

router.put("/:id", [isAdmin, body("titre").notEmpty()], themeController.update)

router.delete("/:id", isAdmin, themeController.delete)

module.exports = router
