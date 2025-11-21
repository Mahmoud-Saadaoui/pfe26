import { PrismaClient } from '@prisma/client'

// Create a single Prisma client instance and reuse it across module reloads
// to avoid exhausting database connections during development. (singleton)
const globalForPrisma = globalThis

const prisma = globalForPrisma.__prisma_client__ || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.__prisma_client__ = prisma

export default prisma
