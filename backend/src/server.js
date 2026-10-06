import 'dotenv/config'
import app from './app/app.js'
import connectDB from './config/db.js'

try {
    await connectDB()

    app.listen(8080, () => {
        console.log('Server is running on port 8080')
    })
} catch (error) {
    console.error('Failed to connect to MongoDB:', error.message)
    process.exit(1)
}
