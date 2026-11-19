import { useState, useEffect } from 'react';
import { api, type HealthResponse} from "./api/client";
import './App.css';

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    api.GET("/health").then(({data, response }) => {
        if (!isMounted) {
          return;
        }

        if (data) {
          setHealth(data);
        } else {
          setError(`Error: HTTP ${response.status}`);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
      });

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
