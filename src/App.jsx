import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import PlayerPage from './pages/Player'
import HostPage from './pages/Host'
import { useEffect } from 'react'
import '../src/styles/app.css'
import '../src/styles/snackbar.css'
import RoomPage from './pages/hostpages/RoomPage'
import PlayerRoom from './pages/playerpages/PlayerRoom'
import ViewEditQuestions from './pages/ViewQuestions'

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  })

  return (
    <div>
      <div className='snackbar' id='snackbar'></div>
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
            id='DarkModeCheckBox'
            defaultChecked
            onChange={(e) => {
              e.target.checked
                ? document.documentElement.classList.add('dark')
                : document.documentElement.classList.remove('dark')
            }}
          />
        </label>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/host/*' element={<HostPage />} />
        <Route path='/player' element={<PlayerPage />} />
        <Route path='/manageroom/:roomname' element={<RoomPage />}></Route>
        <Route
          path='/manageroom/:roomname/viewquestions'
          element={<ViewEditQuestions />}
        ></Route>
        <Route path='/room/' element={<Home />}></Route>
        <Route path='/room/:roomname' element={<PlayerRoom />}></Route>
      </Routes>
    </div>
  )
}

export default App
