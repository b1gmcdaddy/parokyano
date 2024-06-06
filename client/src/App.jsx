import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/parishioner/Home'
import Certificates from './pages/parishioner/Certificate'
import About from './pages/parishioner/About'
import MassSelection from './pages/parishioner/MassSelection'


function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/certificates' element={<Certificates />} />
      <Route path='/about' element={<About />} />
      <Route path='/sample' element={<MassSelection/>}/>
    </Routes>
  </main>
  )
}

export default App
