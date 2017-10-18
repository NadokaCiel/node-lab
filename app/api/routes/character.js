'use strict';

import express from 'express';
import Character from '../controllers/character/Character'
const router = express.Router();

  router.route('/character',)
    .get(Character.list)
    .post(Character.create);


  router.route('/character/:id')
    .get(Character.read)
    .put(Character.update)
    .delete(Character.delete);

export default router
