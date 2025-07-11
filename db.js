const mongoose = require('mongoose');
const config = require('./config.json');

const db = {};

db.mainConnection = mongoose.createConnection(config.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.secondConnection = mongoose.createConnection(config.mongoURL2, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.mainConnection.on('connected', () => {
  console.log('✅ Conectado ao MongoDB (cisum)');
});
db.secondConnection.on('connected', () => {
  console.log('✅ Conectado ao MongoDB (figurinhas)');
});

module.exports = db;
