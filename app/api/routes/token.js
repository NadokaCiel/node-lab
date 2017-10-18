'use strict';

import express from 'express';
import Token from '../controllers/user/Token'

const router = express.Router();

  router.route('/token',)
    .post(Token.create)
    .delete(Token.delete);

export default router
