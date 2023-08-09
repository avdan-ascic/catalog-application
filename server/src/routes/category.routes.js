import express from 'express'
import passport from 'passport'

import categoryCtrl from '../controllers/category.controller'


const router = express.Router()

router.route('/api/categories/add')
  .post(passport.authenticate('jwt'), categoryCtrl.create)
router.route('/api/categories/read')
  .get(categoryCtrl.read)

export default router