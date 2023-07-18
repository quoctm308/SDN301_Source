const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  price_extra: {
    type: Currency,
    required: true,
    min: 0
  },
}, {
  timestamps: true
});

var cakeSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Currency,
    required: true,
    min: 0
  },
  topping: [toppingSchema]
  ,
}, {
  timestamps: true
})

var Cakes = mongoose.model('Cake', cakeSchema);
module.exports = Cakes;