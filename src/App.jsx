import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import PlayerPage from './pages/Player'
import HostPage from './pages/Host'
import { createContext, useEffect, useState } from 'react'
import '../src/styles/app.css'

function App() {
  useEffect(() => {
    Theme
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  })
  //true - DarkTheme, false -LightTheme
  const [Theme, SetTheme] = useState(true)
  const ThemeContext = createContext(null)

  return (
    <ThemeContext.Provider value={Theme}>
      <div className='nav-row'>
        <div> QUIZY </div>
        <label
          htmlFor='DarkModeCheckBox'
          style={{ marginLeft: 'auto', marginRight: 0 }}
        >
          Dark Mode
          <input
            type='checkbox'
            name='DarkMode'
            checked={Theme}
            id='DarkModeCheckBox'
            onChange={(e) => {
              e.target.checked ? SetTheme(true) : SetTheme(false)
            }}
          />
        </label>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/host/*' element={<HostPage />} />
        <Route path='/player' element={<PlayerPage />} />
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
