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
import MassIntentions from './pages/parishioner/MassIntentions'
import Petition from './pages/parishioner/mass-intentions/Petition'
import Thanksgiving from './pages/parishioner/mass-intentions/Thanksgiving'
import Souls from './pages/parishioner/mass-intentions/Souls'
import CertificateBaptism from './pages/parishioner/certs-types/Certificate-Baptism'
import CertificateConfirmation from './pages/parishioner/certs-types/Certificate-Confirmation'
import CertificateWedding from './pages/parishioner/certs-types/Certificate-Wedding'
import Wedding from './pages/parishioner/Wedding'
import TrackStatus from './pages/parishioner/TrackStatus'



function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/certificates' element={<Certificates />} />
      <Route path='/certificate-baptism' element={<CertificateBaptism />} />
      <Route path='/certificate-confirmation' element={<CertificateConfirmation />} />
      <Route path='/certificate-wedding' element={<CertificateWedding />} />
      <Route path='/about' element={<About />} />
      <Route path='/mass-selection' element={<MassSelection/>}/>
      <Route path='/wakemass' element={<WakeMass/>}/>
      <Route path='/funeralmass' element={<FuneralMass/>}/>
      <Route path='/outsidemass' element={<OutsideMass/>}/>
      <Route path='/baptism' element={<Baptism />}/>
      <Route path='/blessing' element={<Blessing />}/>
      <Route path='/anointing' element={<Anointing />}/>
      <Route path='/mass-intention-select' element={<MassIntentions/>}/>
      <Route path='/mass-intention-thanksgiving' element={<Thanksgiving/>}/>
      <Route path='/mass-intention-petition' element={<Petition/>}/>
      <Route path='/mass-intention-souls' element={<Souls/>}/>
      <Route path='/wedding' element={<Wedding />} />
      <Route path='/track-status' element={<TrackStatus />}/>
    </Routes>
  </main>
  )
}

export default App
