import Router from 'express'
import { deleteMusic, getAllMusic,uploadMusic } from '../controller/music.controller.js'
import {upload} from "../utils/upload.js"

const router=Router()

router.route('/upload').post(upload.single("audio"),uploadMusic)
router.route('/delete/:id').delete(deleteMusic)
router.route('/').get(getAllMusic);


export default router