import Router from 'express'
import { getAllMusic, uploadMusic } from '../controller/music.controller.js'
import {upload} from "../utils/upload.js"

const router=Router()

router.route('/upl').post(upload.single("audio"),uploadMusic)
router.route('/').get(getAllMusic);

export default router