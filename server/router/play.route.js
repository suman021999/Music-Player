import Router from 'express'
import { upload } from '../controller/music.controller.js'

const router=Router()

router.route('/upload').post(upload)

export default router