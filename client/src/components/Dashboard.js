import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); // Adjust server URL if needed

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAlerts((prevAlerts) => [...prevAlerts, data]);
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h1>ShieldGuard Dashboard</h1>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
