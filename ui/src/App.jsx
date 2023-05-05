import { Routes, Route } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import { MainPage } from "./pages/MainPage/MainPage";
import { MarketPage } from "./pages/MarketPage/MarketPage";
import { customTheme } from "./config/customTheme";
import { CoinPage } from "./pages/CoinPage/CoinPage";
import { UserPage } from "./pages/UserPage/UserPage";
import { UserContext } from "./context/UserContext";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";
function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/market" element={<MarketPage />}></Route>
          <Route path="/coins/:coin" element={<CoinPage />}></Route>
          <Route
            path="/users/:user"
            element={
              <UserContext.Provider
                value={{ loading: true, GetUserData: () => {} }}
              >
                <UserPage />
              </UserContext.Provider>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CssVarsProvider>
  );
}

export default App;
