import prisma from '../prisma/client.js'

// Get all users (safe fields only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.utilisateur.findMany({
      select: { id: true, nom: true, prenom: true, email: true, role: true }
    })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get one user by ID
export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const user = await prisma.utilisateur.findUnique({
      where: { id },
      select: { id: true, nom: true, prenom: true, email: true, role: true }
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update user (nom, prenom, email, role)
export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id)
    const { nom, prenom, email, role } = req.body
    const user = await prisma.utilisateur.update({
      where: { id },
      data: { nom, prenom, email, role },
      select: { id: true, nom: true, prenom: true, email: true, role: true }
    })
    res.json(user)
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'User not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id)
    await prisma.utilisateur.delete({ where: { id } })
    res.json({ message: 'User deleted' })
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'User not found' })
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
