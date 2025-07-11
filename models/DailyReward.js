const { Schema } = require('mongoose');
const db = require('../db'); // importa sua conexão

const DailyRewardSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  lastClaim: { type: Date, required: true }
});

module.exports = db.secondConnection.model('DailyReward', DailyRewardSchema);
