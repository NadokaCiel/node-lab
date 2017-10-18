'use strict';

import express from 'express';
import User from '../controllers/user/User'
import Check from '../../middlewares/check'

const router = express.Router();

  router.route('/user',)
    .get(Check.checkLogin, User.list)
    .post(User.create);


  router.route('/user/:id')
    .get(Check.checkLogin, User.read)
    .put(Check.checkLogin, User.update)
    .delete(Check.checkLogin, User.delete);

export default router
