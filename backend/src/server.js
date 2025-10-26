import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import router from './routes/api.js'
import { connectDB } from './config/database.js'
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 8080
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

connectDB()

app.use('/api-v1', router)

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
