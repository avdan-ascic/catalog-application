import express from 'express'
import passport from 'passport'
import multer from 'multer'

import itemCtrl from '../controllers/item.controller'

const storage = multer.memoryStorage()

const upload = multer({ storage })

const router = express.Router()

router.route('/api/items/add')
  .post(passport.authenticate('jwt'), upload.single('image'), itemCtrl.create)
router.route('/api/items/readById')
  .post(itemCtrl.readById)
router.route('/api/items/readByCat')
  .post(itemCtrl.readByCat)
router.route('/api/items/readAll')
  .get(itemCtrl.readAllItems)
router.route('/api/items/update')
  .post(passport.authenticate('jwt'), itemCtrl.update)
router.route('/api/items/delete')
  .post(passport.authenticate('jwt'), itemCtrl.remove)

export default router