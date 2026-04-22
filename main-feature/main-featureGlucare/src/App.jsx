import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Analisis from './pages/Analisis';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/analisis' element={<Analisis />} />

      </Routes>
    
    </BrowserRouter>
  )
}

export default App;
