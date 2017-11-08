'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  id: Number,
  name: {
    type: String,
    Required: 'Kindly enter the name of the item'
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['food', 'weapon', 'armor'],
    default: 'food'
  }
});

ItemSchema.index({id: 1});

const Item = mongoose.model('Item', ItemSchema);


export default Item
