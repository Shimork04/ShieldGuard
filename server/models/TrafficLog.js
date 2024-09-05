const mongoose = require('mongoose');

const trafficLogSchema = new mongoose.Schema({
  ip: String,
  path: String,
  timestamp: Date,
  status: String
});

const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);

module.exports = TrafficLog;
