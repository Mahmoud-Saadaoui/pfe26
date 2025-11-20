import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import {
  createIntervention,
  getAllInterventions,
  getIntervention,
  updateIntervention,
  replyIntervention,
  changeStatut,
  addAttachments,
  getStats,
  getTopThemes,
  getTopCommunes,
} from '../controllers/interventionController.js'

const router = express.Router()

router.get('/', authMiddleware, getAllInterventions)
router.post('/', authMiddleware, createIntervention)
router.get('/stats', authMiddleware, getStats)
router.get('/top-themes', authMiddleware, getTopThemes)
router.get('/top-communes', authMiddleware, getTopCommunes)
router.get('/:id', authMiddleware, getIntervention)
router.put('/:id', authMiddleware, updateIntervention)
router.post('/:id/reply', authMiddleware, replyIntervention)
router.patch('/:id/status', authMiddleware, changeStatut)
router.post('/:id/attachments', authMiddleware, addAttachments)

export default router
