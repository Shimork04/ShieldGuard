const requestCounts = {};
const THRESHOLD = 20; // Example threshold: 20 requests per minute
WINDOW_SIZE = 60000; // 1 minute in milliseconds

module.exports.rateLimiter = function rateLimiter(req, res, next) {
  const ip = req.ip;

  if (!requestCounts[ip]) {
    requestCounts[ip] = {
      count: 1,
      startTime: Date.now()
    };
  } else {
    requestCounts[ip].count++;
  }

  const currentTime = Date.now();
  const timeElapsed = currentTime - requestCounts[ip].startTime;

  if (timeElapsed > WINDOW_SIZE) {
    // Reset the count after the window size time has passed
    requestCounts[ip] = {
      count: 1,
      startTime: currentTime
    };
  } else if (requestCounts[ip].count > THRESHOLD) {
    console.warn(`Potential DDoS attack detected from IP: ${ip}`);
    
    // Reset the count after triggering an alert
    requestCounts[ip] = {
      count: 1,
      startTime: currentTime
    };

    return res.status(429).json({ message: `Too many requests from IP ${ip}. Potential DDoS detected.` });
  }

  next();
};
