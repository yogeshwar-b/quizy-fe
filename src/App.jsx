import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import '../src/styles/app.scss'
import '../src/styles/snackbar.scss'
import RoomPage from './pages/hostpages/RoomPage'
import PlayerRoom from './pages/playerpages/PlayerRoom'
import ViewEditQuestions from './pages/hostpages/ViewQuestions'
import Scoreboard from './pages/Scoreboard'
import './styles/index.scss'
import ThemeButton from './Components/Themebutton'

function App() {
  return (
    <div id='App'>
      <div className='snackbar' id='snackbar'></div>
      <div className='nav-row'>
        <div> QUIZY </div>
        <ThemeButton></ThemeButton>
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
        <Route path='/manageroom/:roomname' element={<RoomPage />}></Route>
        <Route
          path='/manageroom/:roomname/viewquestions'
          element={<ViewEditQuestions />}
        ></Route>
        <Route path='/room/' element={<Home />}></Route>
        <Route path='/room/:roomname' element={<PlayerRoom />}></Route>
        <Route
          path='/room/:roomname/scoreboard'
          element={<Scoreboard />}
        ></Route>
      </Routes>
    </div>
  )
}

export default App
