import {Routes, Route} from 'react-router-dom';
import { CssVarsProvider} from '@mui/joy/styles';
import { MainPage } from './pages/MainPage/MainPage';
import { customTheme } from './config/customTheme'

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
      </Routes>
    </CssVarsProvider>
  )
}

export default App
