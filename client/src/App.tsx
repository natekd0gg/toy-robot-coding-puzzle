import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  // import.meta.env.VITE_API_BASE_URL_PROD
  // import.meta.env.VITE_API_BASE_URL_DEV;

  const fetchPing = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL_PROD}report`
      );
      console.log('response', response.data);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    fetchPing();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
