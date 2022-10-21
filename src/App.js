import { useEffect } from "react";
import "./App.css";
import { ProductList } from "./components/ProductList/ProductList";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { telegram } = useTelegram();

  useEffect(() => {
    telegram.ready();
    console.log('telegram: ', telegram);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, onClose } = useTelegram();

  return (
    <div className="App">
      5mood app {user}
      {/* <ProductList /> */}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
