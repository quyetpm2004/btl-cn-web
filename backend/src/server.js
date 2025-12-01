import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './routes/api.js'
import { connectDB } from './config/database.js'
import cookieParser from 'cookie-parser'
import { Server } from 'socket.io'
import { createServer } from 'http'

const port = process.env.PORT || 8080
const app = express()
app.use(
  cors({
    origin: process.env.BASE_URL_FRONTEND || 'http://localhost:3000',
    credentials: true
  })
)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

app.use('/api-v1', router)

const socketServer = createServer(app)
const io = new Server(socketServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
