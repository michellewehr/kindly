const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  // process.env.MONGODB_URI || 
  'mongodb://localhost/kindly',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
