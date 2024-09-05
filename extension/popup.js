document.getElementById('analyzeButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: analyzeTraffic
      });
    });
  });
  
  document.getElementById('dashboardButton').addEventListener('click', () => {
    window.open('http://localhost:3000/dashboard');  // Replace with your server URL
  });
  
  const ws = new WebSocket('ws://localhost:3000');  // Replace with your server URL
  
  ws.onopen = () => {
    console.log('Connected to WebSocket server.');
    document.getElementById('status').innerText = 'Connected to analysis server.';
  };
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data from server:', data);
    document.getElementById('status').innerText = `Analysis result: ${data.message}`;
  
    if (data.status === 'warning') {
      showNotification('Security Alert', data.message);
    }
  };
  
  function analyzeTraffic() {
    fetch('http://localhost:3000/analyze', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        document.getElementById('status').innerText = 'Analysis in progress...';
      })
      .catch(error => {
        document.getElementById('status').innerText = 'Error during analysis. Please try again.';
      });
  }
  
  function showNotification(title, message) {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }
  