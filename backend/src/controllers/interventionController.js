import prisma from '../prisma/client.js'

// Create an intervention
export const createIntervention = async (req, res) => {
  try {
    const utilisateurId = req.user?.id
    const { communeId, themeId, nomUsager, prenomUsager, question } = req.body

    if (!communeId || !themeId || !nomUsager || !prenomUsager || !question) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const intervention = await prisma.intervention.create({
      data: {
        communeId: Number(communeId),
        themeId: Number(themeId),
        utilisateurId: utilisateurId ? Number(utilisateurId) : null,
        nomUsager,
        prenomUsager,
        question,
        statut: 'EN_COURS',
      },
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true },
    })

    res.status(201).json(intervention)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get all interventions
export const getAllInterventions = async (req, res) => {
  try {
    const interventions = await prisma.intervention.findMany({
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true },
      orderBy: { dateCreation: 'desc' }
    })
    res.json(interventions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get one intervention
export const getIntervention = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const intervention = await prisma.intervention.findUnique({
      where: { id },
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true }
    })
    if (!intervention) return res.status(404).json({ message: 'Intervention not found' })
    res.json(intervention)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update intervention (fields editable: communeId, themeId, nomUsager, prenomUsager, question)
export const updateIntervention = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { communeId, themeId, nomUsager, prenomUsager, question } = req.body

    const data = {}
    if (communeId !== undefined) data.communeId = Number(communeId)
    if (themeId !== undefined) data.themeId = Number(themeId)
    if (nomUsager !== undefined) data.nomUsager = nomUsager
    if (prenomUsager !== undefined) data.prenomUsager = prenomUsager
    if (question !== undefined) data.question = question

    const intervention = await prisma.intervention.update({
      where: { id },
      data,
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true }
    })

    res.json(intervention)
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') return res.status(404).json({ message: 'Intervention not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Reply to an intervention (sets reponse, dateReponse, optional satisfaction, optionally change statut)
export const replyIntervention = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { reponse, satisfaction, setStatutTo } = req.body

    if (!reponse) return res.status(400).json({ message: 'reponse is required' })

    const data = { reponse, dateReponse: new Date() }
    if (satisfaction !== undefined) data.satisfaction = Number(satisfaction)
    data.statut = setStatutTo ?? 'TRAITEE'

    const intervention = await prisma.intervention.update({
      where: { id },
      data,
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true }
    })

    res.json(intervention)
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') return res.status(404).json({ message: 'Intervention not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}


// Change statut only
export const changeStatut = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { statut } = req.body
    if (!statut) return res.status(400).json({ message: 'statut is required' })
    // Validate enum values
    const allowed = ['EN_COURS', 'TRAITEE', 'ARCHIVEE']
    if (!allowed.includes(statut)) return res.status(400).json({ message: 'Invalid statut' })

    const intervention = await prisma.intervention.update({
      where: { id },
      data: { statut },
      include: { commune: true, theme: true, utilisateur: true, piecesJointe: true }
    })

    res.json(intervention)
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') return res.status(404).json({ message: 'Intervention not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Add attachments (piecesJointe): accept single object or array of { publicId, secureUrl, type }
export const addAttachments = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const payload = req.body

    const attachments = Array.isArray(payload) ? payload : [payload]

    // Validate
    for (const a of attachments) {
      if (!a.publicId || !a.secureUrl || !a.type) {
        return res.status(400).json({ message: 'Each attachment requires publicId, secureUrl and type' })
      }
    }

    const created = []
    for (const a of attachments) {
      const pj = await prisma.pieceJointe.create({
        data: { interventionId: id, publicId: a.publicId, secureUrl: a.secureUrl, type: a.type }
      })
      created.push(pj)
    }

    const intervention = await prisma.intervention.findUnique({
      where: { id },
      include: { piecesJointe: true }
    })

    res.status(201).json({ added: created, intervention })
  } catch (err) {
    console.error(err)
    if (err.code === 'P2025') return res.status(404).json({ message: 'Intervention not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Statistics: total, counts by statut, top 5 themes, top 5 communes
// helper to fetch top themes (returns array)
const fetchTopThemes = async () => {
    const topThemesRaw = await prisma.theme.findMany({
        select: { id: true, nom: true, _count: { select: { interventions: true } } },
        orderBy: { interventions: { _count: 'desc' } },
        take: 5,
    })
    return topThemesRaw.map(t => ({ id: t.id, nom: t.nom, count: t._count.interventions }))
}

// helper to fetch top communes (returns array)
const fetchTopCommunes = async () => {
    const topCommunesRaw = await prisma.commune.findMany({
        select: { id: true, nom: true, codePostal: true, _count: { select: { interventions: true } } },
        orderBy: { interventions: { _count: 'desc' } },
        take: 5,
    })
    return topCommunesRaw.map(c => ({ id: c.id, nom: c.nom, codePostal: c.codePostal, count: c._count.interventions }))
}

// HTTP handler: get top themes
export const getTopThemes = async (req, res) => {
    try {
        const topThemes = await fetchTopThemes()
        res.json(topThemes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// HTTP handler: get top communes
export const getTopCommunes = async (req, res) => {
    try {
        const topCommunes = await fetchTopCommunes()
        res.json(topCommunes)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

// Statistics: total, counts by statut, top 5 themes, top 5 communes
export const getStats = async (req, res) => {
    try {
        const total = await prisma.intervention.count()
        const enCours = await prisma.intervention.count({ where: { statut: 'EN_COURS' } })
        const traitee = await prisma.intervention.count({ where: { statut: 'TRAITEE' } })
        const archivee = await prisma.intervention.count({ where: { statut: 'ARCHIVEE' } })


        res.json({ total, enCours, traitee, archivee })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
