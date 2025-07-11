const { Schema } = require('mongoose');
const db = require('../db');

const WalletSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  coins: { type: Number, required: true, default: 0 }
});

module.exports = db.secondConnection.model('Wallet', WalletSchema);
