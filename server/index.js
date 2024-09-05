// const express = require('express');
// const mongoose = require('mongoose');
// const WebSocket = require('ws');
// const path = require('path');
// const { analyzeTraffic } = require('./controllers/trafficController');
// const { analyzeBehavior } = require('./controllers/behaviorAnalysis');
// const { rateLimiter } = require('./middleware/rateLimiter');
// const { checkThreatIntelligence } = require('./middleware/threatIntelligence');

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/shieldguard', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Serve static files for the Dashboard
// app.use(express.static(path.join(__dirname, '../client/public')));

// // WebSocket Server for node communication
// const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// const wss = new WebSocket.Server({ server });

// // Handle WebSocket Connections
// wss.on('connection', (ws) => {
//   console.log('New node connected');

//   ws.on('message', async (message) => {
//     const data = JSON.parse(message);
//     const trafficResult = await analyzeTraffic(data);
//     const behaviorResult = await analyzeBehavior(data);

//     // Combine results for consensus and response
//     const combinedResult = {
//       ...trafficResult,
//       ...behaviorResult,
//       status: trafficResult.status === 'warning' || behaviorResult.status === 'warning' ? 'warning' : 'safe',
//       message: [trafficResult.message, behaviorResult.message].join(' | ')
//     };

//     ws.send(JSON.stringify(combinedResult));
//   });
// });

// // API Route for Chrome Extension Analysis Trigger
// app.post('/analyze', rateLimiter, checkThreatIntelligence, async (req, res) => {
//   // Simulate traffic analysis
//   const ip = req.ip;
//   const path = req.originalUrl;

//   // Call traffic and behavior analysis functions
//   const trafficResult = await analyzeTraffic({ ip, path });
//   const behaviorResult = await analyzeBehavior({ ip, path });

//   // Combine results
//   const combinedResult = {
//     status: trafficResult.status === 'warning' || behaviorResult.status === 'warning' ? 'warning' : 'safe',
//     message: [trafficResult.message, behaviorResult.message].join(' | ')
//   };

//   res.json({ message: combinedResult.message });
// });




const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const { analyzeTraffic } = require('./controllers/trafficController');
const { analyzeBehavior } = require('./controllers/behaviourAnalysis');
const { rateLimiter } = require('./middleware/rateLimiter');
const { checkThreatIntelligence } = require('./middleware/threatIntelligence');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files for the Dashboard
app.use(express.static(path.join(__dirname, '../client/public')));

// WebSocket Server for node communication
const server = app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const wss = new WebSocket.Server({ server });

// Handle WebSocket Connections
wss.on('connection', (ws) => {
  console.log('New node connected');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    const trafficResult = await analyzeTraffic(data);
    const behaviorResult = await analyzeBehavior(data);

    // Combine results for consensus and response
    const combinedResult = {
      ...trafficResult,
      ...behaviorResult,
      status: trafficResult.status === 'warning' || behaviorResult.status === 'warning' ? 'warning' : 'safe',
      message: [trafficResult.message, behaviorResult.message].join(' | ')
    };

    ws.send(JSON.stringify(combinedResult));
  });
});

// API Route for Chrome Extension Analysis Trigger
app.post('/analyze', rateLimiter, checkThreatIntelligence, async (req, res) => {
  // Simulate traffic analysis
  const ip = req.ip;
  const path = req.originalUrl;

  // Call traffic and behavior analysis functions
  const trafficResult = await analyzeTraffic({ ip, path });
  const behaviorResult = await analyzeBehavior({ ip, path });

  // Combine results
  const combinedResult = {
    status: trafficResult.status === 'warning' || behaviorResult.status === 'warning' ? 'warning' : 'safe',
    message: [trafficResult.message, behaviorResult.message].join(' | ')
  };

  res.json({ message: combinedResult.message });
});
