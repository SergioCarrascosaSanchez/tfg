import { Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import { MainPage } from "./pages/MainPage/MainPage";
import { MarketPage } from "./pages/MarketPage/MarketPage";
import { customTheme } from "./config/customTheme";
import { CoinPage } from "./pages/CoinPage/CoinPage";
import { StudentPage } from "./pages/StudentPage/StudentPage";

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/market" element={<MarketPage />}></Route>
        <Route path="/coins/:coin" element={<CoinPage />}></Route>
        <Route path="/students/:student" element={<StudentPage />}></Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
