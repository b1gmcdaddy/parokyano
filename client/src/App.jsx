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
import Blessing from './pages/parishioner/Blessing'
import Anointing from './pages/parishioner/Anointing'
//import CertificateBaptism from './pages/parishioner/certs-types/Certificate-Baptism'

function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/certificates' element={<Certificates />} />
{/*<Route path='/certificate-baptism' element={<CertificateBaptism />} />*/}
      <Route path='/about' element={<About />} />
      <Route path='/mass-selection' element={<MassSelection/>}/>
      <Route path='/wakemass' element={<WakeMass/>}/>
      <Route path='/funeralmass' element={<FuneralMass/>}/>
      <Route path='/outsidemass' element={<OutsideMass/>}/>
      <Route path='/baptism' element={<Baptism />}/>
      <Route path='/blessing' element={<Blessing />}/>
      <Route path='/anointing' element={<Anointing />}/>
    </Routes>
  </main>
  )
}

export default App
