import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import PlayerPage from './pages/Player'
import HostPage from './pages/Host'

function App() {
  return (
    <div>
      <div style={{ display: 'flex', gap: '2em', minWidth: '30em' }}>
        <div> QUIZY </div>
        <label
          htmlFor='DarkModeCheckBox'
          style={{ marginLeft: 'auto', marginRight: 0 }}
        >
          Dark Mode
          <input type='checkbox' name='DarkMode' id='DarkModeCheckBox' />
        </label>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/host/*' element={<HostPage />} />
        <Route path='/player' element={<PlayerPage />} />
      </Routes>
    </div>
  )
}

export default App
