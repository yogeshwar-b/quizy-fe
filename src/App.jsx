import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import PlayerPage from './pages/Player'
import HostPage from './pages/Host'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/host' element={<HostPage />} />
      <Route path='/player' element={<PlayerPage />} />
    </Routes>
  )
}

export default App
