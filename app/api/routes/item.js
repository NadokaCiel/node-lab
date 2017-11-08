'use strict';

import express from 'express';
import Item from '../controllers/item/Item'
const router = express.Router();

  router.route('/item',)
    .get(Item.list)
    .post(Item.create);


  router.route('/item/:id')
    .get(Item.read)
    .put(Item.update)
    .delete(Item.delete);

export default router
