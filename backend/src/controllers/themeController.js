const Theme = require("../models/Theme")
const { validationResult } = require("express-validator")

exports.getAll = async (req, res, next) => {
  try {
    const themes = await Theme.findAll()
    res.json(themes)
  } catch (error) {
    next(error)
  }
}

exports.create = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })

  try {
    const id = await Theme.create(req.body)
    res.status(201).json({ success: true, id, message: "Theme created" })
  } catch (error) {
    next(error)
  }
}

exports.update = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() })

  try {
    await Theme.update(req.params.id, req.body)
    res.json({ success: true, message: "Theme updated" })
  } catch (error) {
    next(error)
  }
}

exports.delete = async (req, res, next) => {
  try {
    await Theme.delete(req.params.id)
    res.json({ success: true, message: "Theme deleted" })
  } catch (error) {
    next(error)
  }
}
