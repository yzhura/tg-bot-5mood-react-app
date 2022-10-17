/* eslint-disable no-undef */
import { useEffect } from 'react';
import './App.css';

const telegram = Telegram.WebApp;
console.log('telegram: ', telegram);

function App() {

  useEffect(() => {
    telegram.ready();
  }, [])

  const onClose = () => {
    telegram.close();
  }

  return (
    <div className="App">
      5mood app
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
