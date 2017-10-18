'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
  id: Number,
  name: {
    type: String,
    Required: 'Kindly enter the name of the character'
  },
  create_time: {
    type: Date,
    default: Date.now
  },
  types: {
    type: [{
      type: String,
      enum: ['physical', 'spell', 'supporter']
    }],
    default: ['physical']
  }
});

CharacterSchema.index({id: 1});

const Character = mongoose.model('Character', CharacterSchema);


export default Character
