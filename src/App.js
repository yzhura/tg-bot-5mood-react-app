
import './App.css';
import { useTelegram } from './hooks/useTelegram';

function App() {

  const {user, onClose} = useTelegram();

  return (
    <div className="App">
      5mood app { user }
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
