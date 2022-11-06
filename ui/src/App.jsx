import {Routes, Route} from 'react-router-dom';
import { CssVarsProvider} from '@mui/joy/styles';
import { MainPage } from './pages/MainPage/MainPage';
import { MarketPage } from './pages/MarketPage/MarketPage';
import { customTheme } from './config/customTheme'

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/market" element={<MarketPage/>}></Route>
      </Routes>
    </CssVarsProvider>
  )
}

export default App
