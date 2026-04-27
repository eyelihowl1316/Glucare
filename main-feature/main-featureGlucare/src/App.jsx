import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './pages/Dashboard'
import Analisis from './pages/Analisis';
import Kuesioner from './pages/Kuesioner';
import ModeLab from './pages/ModeLab';
import LoadingAnalisis from './pages/LoadingAnalisis';
import HasilAnalisis from './pages/HasilAnalisis';
import Rencana90Hari from './pages/Rencana90-Hari';
import Evaluasi from './pages/Evaluasi';
import Pencapaian from './pages/Pencapaian';

function App() {

  return (
      <Routes>

        <Route path='/' element={<Dashboard />} />
        <Route path='/analisis' element={<Analisis />} />
        <Route path="/kuesioner" element={<Kuesioner />} />
        <Route path="/modeLab" element={<ModeLab />}/>
        <Route path="/loading" element={<LoadingAnalisis />}/>
        <Route path="/hasil" element={<HasilAnalisis />}/>
        <Route path="/rencana" element={<Rencana90Hari />}/>
        <Route path="/evaluasi" element={<Evaluasi />}/>
        <Route path="/pencapaian" element={<Pencapaian />}/>

      </Routes>  
  );
}

export default App;
