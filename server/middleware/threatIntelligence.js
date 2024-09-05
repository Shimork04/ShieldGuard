const axios = require('axios');

module.exports.checkThreatIntelligence = async function checkThreatIntelligence(req, res, next) {
  const ip = req.ip;

  try {
    // Example call to a threat intelligence service
    const response = await axios.get(`https://example-threat-intelligence-service.com/check?ip=${ip}`);
    if (response.data.threat) {
      console.warn(`Threat intelligence flagged IP: ${ip}`);
      return res.status(403).json({ message: `IP ${ip} flagged by threat intelligence service.` });
    }
  } catch (error) {
    console.error('Error checking threat intelligence:', error.message);
  }

  next();
};
