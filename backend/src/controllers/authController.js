import prisma from "../prisma/client.js"
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 5
const passwordComplexityRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/ 

import prisma from "../prisma/client.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Register function
export const register = async (req, res) => {
	try {
		const { nom, prenom, email, motDePasse, role } = req.body

		const errors = []
		if (!nom || typeof nom !== 'string' || nom.trim().length < 2) errors.push({ field: 'nom', message: 'Nom is required (min 2 chars)' })
		if (!prenom || typeof prenom !== 'string' || prenom.trim().length < 2) errors.push({ field: 'prenom', message: 'Prenom is required (min 2 chars)' })
		if (!email || typeof email !== 'string' || !emailRegex.test(email)) errors.push({ field: 'email', message: 'Valid email is required' })
		if (!motDePasse || typeof motDePasse !== 'string' || motDePasse.length < MIN_PASSWORD_LENGTH) {
			errors.push({ field: 'motDePasse', message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` })
		} else if (!passwordComplexityRegex.test(motDePasse)) {
			errors.push({ field: 'motDePasse', message: 'Password must include at least one uppercase letter, one lowercase letter, one number and one special character' })
		}
		
		if (errors.length) return res.status(400).json({ errors })

		const normalizedEmail = email.toLowerCase()
		const existing = await prisma.utilisateur.findUnique({ where: { email: normalizedEmail } })
		if (existing) return res.status(400).json({ errors: [{ field: 'email', message: 'User already exists' }] })

		const motDePasseHash = await hash(motDePasse, 10)

		const user = await prisma.utilisateur.create({
			data: {
				nom: nom.trim(),
				prenom: prenom.trim(),
				email: normalizedEmail,
				motDePasseHash,
				role: role || 'AGENT',
			},
			select: { id: true, nom: true, prenom: true, email: true, role: true },
		})

		return res.status(201).json({ message: 'User created', user })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

//login function
export const login = async (req, res) => {
	try {
		const { email, motDePasse } = req.body
		const errors = []
		if (!email || typeof email !== 'string' || !emailRegex.test(email)) errors.push({ field: 'email', message: 'Valid email is required' })
		if (!motDePasse || typeof motDePasse !== 'string' || motDePasse.length < 1) errors.push({ field: 'motDePasse', message: 'Password is required' })
		if (errors.length) return res.status(400).json({ errors })

		const normalizedEmail = email.toLowerCase()
		const user = await prisma.utilisateur.findUnique({ where: { email: normalizedEmail } })
		if (!user) return res.status(404).json({ errors: [{ field: 'email', message: 'User not found' }] })

		const ok = await compare(motDePasse, user.motDePasseHash)
		if (!ok) return res.status(401).json({ errors: [{ field: 'motDePasse', message: 'Invalid credentials' }] })

		const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })

		const safeUser = { id: user.id, nom: user.nom, prenom: user.prenom, email: user.email, role: user.role }

		return res.status(200).json({ message: 'Authenticated', token, user: safeUser })
	} catch (err) {
		console.error(err)
		return res.status(500).json({ message: "Internal Server Error" })
	}
}

// Logout is handled client-side (remove token). Provide endpoint for symmetry.
export const logout = async (req, res) => {
	return res.status(200).json({ message: "Logged out" })
}

//Get user info
  try {
    const { nom, prenom, email, motDePasse, role } = req.body;

    if (!nom || !prenom || !email || !motDePasse) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await prisma.utilisateur.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const motDePasseHash = await hash(motDePasse, 10);

    const user = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        motDePasseHash,
        role: role || "AGENT",
      },
      select: { id: true, nom: true, prenom: true, email: true, role: true },
    });

    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse)
      return res.status(400).json({ message: "All fields are required" });

    const user = await prisma.utilisateur.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await compare(motDePasse, user.motDePasseHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,
    };

    return res
      .status(200)
      .json({ message: "Authenticated", token, user: safeUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout is handled client-side (remove token). Provide endpoint for symmetry.
export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logged out" });
};

export const me = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await prisma.utilisateur.findUnique({
      where: { id: userId },
      select: { id: true, nom: true, prenom: true, email: true, role: true },
    });

    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
