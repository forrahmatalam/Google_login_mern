import 'dotenv/config'
import app from './app/app.js'
import connectDB from './config/db.js'
connectDB()

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})
