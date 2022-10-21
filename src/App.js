import { useEffect } from "react";
import "./App.css";
import { ProductList } from "./components/ProductList/ProductList";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { telegram } = useTelegram();

  useEffect(() => {
    telegram.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user, onClose } = useTelegram();

  return (
    <div className="App">
      5mood app {user?.first_name}
      <ProductList />
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default App;
