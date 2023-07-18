const express = require('express');
const mongoose = require('mongoose');
const youtubeRouter = require('./routes/youtubesRouter');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/conFusion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err.message);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/youtubes', youtubeRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});