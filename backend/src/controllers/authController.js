import prisma from "../prisma/client.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
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
