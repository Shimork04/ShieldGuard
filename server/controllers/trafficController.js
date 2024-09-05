const TrafficLog = require('../models/TrafficLog');

async function analyzeTraffic(data) {
  const { ip, path } = data;
  const requestRate = Math.floor(Math.random() * 200);

  const suspicious = requestRate > 100; // Threshold for DDoS detection

  const log = new TrafficLog({ ip, path, timestamp: new Date(), status: suspicious ? 'blocked' : 'allowed' });
  await log.save();

  return {
    status: suspicious ? 'warning' : 'safe',
    message: suspicious ? `Potential DDoS attack detected from IP ${ip}` : 'Traffic normal'
  };
}

module.exports = { analyzeTraffic };
