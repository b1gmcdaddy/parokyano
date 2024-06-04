import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/parishioner/Home'
import Certificates from './pages/parishioner/Certificate'


function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/certificates' element={<Certificates />} />
    </Routes>
  </main>
  )
}

export default App
