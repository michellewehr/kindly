const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  // process.env.MONGODB_URI || 
  // 'mongodb://localhost/kindly',
  'mongodb://127.0.0.1/kindly',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
