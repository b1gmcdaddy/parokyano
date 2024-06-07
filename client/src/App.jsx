import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/parishioner/Home'
import Certificates from './pages/parishioner/Certificate'
import About from './pages/parishioner/About'
import MassSelection from './pages/parishioner/MassSelection'
import Baptism from './pages/parishioner/Baptism'
import WakeMass from './pages/parishioner/WakeMass'
import FuneralMass from './pages/parishioner/FuneralMass'
import OutsideMass from './pages/parishioner/OutsideMass'


function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/certificates' element={<Certificates />} />
      <Route path='/about' element={<About />} />
      <Route path='/mass-selection' element={<MassSelection/>}/>
      <Route path='/wakemass' element={<WakeMass/>}/>
      <Route path='/funeralmass' element={<FuneralMass/>}/>
      <Route path='/outsidemass' element={<OutsideMass/>}/>
      <Route path='/baptism' element={<Baptism />}/>
    </Routes>
  </main>
  )
}

export default App
