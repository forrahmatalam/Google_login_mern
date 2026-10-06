import Router from 'express'
import { testAuth ,googleLogin } from '../controllers/auth.controller.js'


const router = Router()

router.get('/test',testAuth )

router.post('/google',googleLogin)

export default router