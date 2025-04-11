import Router from 'express'
import { created } from '../controller/music.controller'

const router=Router()

router.route('/create').post(created)

export default router