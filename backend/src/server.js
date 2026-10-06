import app from './app/app.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config()
connectDB()

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
