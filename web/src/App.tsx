import { useState, useEffect } from 'react'
import './App.css'

type Health = {
  status: string;
  database: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const checkBacked = async () => {
      try {
        const response = await fetch(`${API_URL}/health`);
        if(!response.ok) {
          throw new Error("Couldn't connect to server");
        }

        const healthStatus: Health = await response.json();
        if (isMounted) {
          setHealth(healthStatus);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Something went wrong"
          );
        }
      }
    };

    checkBacked();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <h1>Context Inspector</h1>
      {error ? (
        <p>Server Error: {error}</p>
      ) : health ? (
        <p>Server: {health.status} | Database: {health.database}</p>
      ) : (<p>Checking server connection...</p>)}
    </main>
  )
}

export default App
