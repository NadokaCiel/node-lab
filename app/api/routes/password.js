'use strict';

import express from 'express';
import Password from '../controllers/user/Password'

const router = express.Router();

  router.route('/password',)
    .put(Password.update);

export default router
