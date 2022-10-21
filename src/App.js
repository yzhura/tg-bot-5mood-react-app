import { Typography } from "@mui/material";
import { useEffect } from "react";
import { ProductList } from "./components/ProductList/ProductList";
import { useTelegram } from "./hooks/useTelegram";
import "./App.css";

function App() {
  const { telegram } = useTelegram();

  useEffect(() => {
    telegram.ready();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = useTelegram();

  return (
    <div className="App">
      <Typography m={2} textAlign="center">
        Вітаю, {user?.first_name || "тебе"}! Гарного дня
      </Typography>
      <ProductList />
    </div>
  );
}

export default App;
