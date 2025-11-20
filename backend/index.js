import express from "express"
import dotenv from "dotenv"
import rootRouter from "./src/routes/index.js"
dotenv.config();
import cors from "cors"

const app = express();

app.use(express.json())

app.use(cors({
    origin:"*"
}))

import prisma from "./src/prisma/client.js"

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Backend is running")
})

app.use('/api', rootRouter)

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})

async function shutdown(signal) {
    try {
        console.log(`\nReceived ${signal}. Closing server...`)
        server.close(async () => {
            console.log('HTTP server closed.')
            try {
                await prisma.$disconnect()
                console.log('Prisma disconnected.')
            } catch (e) {
                console.error('Error disconnecting Prisma:', e)
            } finally {
                process.exit(0)
            }
        })
        setTimeout(() => {
            console.warn('Forcing shutdown.')
            process.exit(1)
        }, 10000)
    } catch (err) {
        console.error('Shutdown error:', err)
        process.exit(1)
    }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    shutdown('uncaughtException')
})
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
    shutdown('unhandledRejection')
})