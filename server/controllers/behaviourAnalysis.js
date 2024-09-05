async function analyzeBehavior(data) {
    const { ip, path } = data;
  
    const abnormalBehavior = Math.random() > 0.7;
  
    return {
      status: abnormalBehavior ? 'warning' : 'safe',
      message: abnormalBehavior ? `Abnormal behavior detected from IP ${ip}` : 'Behavior normal'
    };
  }
  
  module.exports = { analyzeBehavior };
  