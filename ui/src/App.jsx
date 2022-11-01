import {Routes, Route} from 'react-router-dom';
import { CssVarsProvider } from '@mui/joy/styles';
function App() {
  return (
    <CssVarsProvider>
      <Routes>
        <Route path="/"></Route>
      </Routes>
    </CssVarsProvider>
  )
}

export default App
