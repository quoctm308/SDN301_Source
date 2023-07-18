const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  published: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const Tutorials = mongoose.model('Tutorial', tutorialSchema);

module.exports = Tutorials;
