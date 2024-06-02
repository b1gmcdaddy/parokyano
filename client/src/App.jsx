import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/parishioner/Home'


function App() {

  return (
    <main>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </main>
  )
}

export default App
