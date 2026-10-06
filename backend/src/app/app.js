import express from 'express'
import cors from 'cors'
import authRoute from '../routes/auth.route.js'


const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/auth', authRoute)

export default app
