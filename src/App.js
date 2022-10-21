
import { useEffect } from 'react';
import './App.css';
import { ProductList } from './components/ProductList/ProductList';
import { useTelegram } from './hooks/useTelegram';

// eslint-disable-next-line no-undef
const telegram = Telegram.WebApp;

function App() {

  useEffect(() => {
    telegram.ready()
  }, [])

  const {user, onClose} = useTelegram();

  return (
    <div className="App">
      5mood app { user }
      <ProductList/>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
