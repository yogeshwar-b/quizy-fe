import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AddQuestion } from './AddQuestion'
import GameRoom from './GameRoom'
import ViewEditQuestions from './ViewQuestions'
import '../styles/component.scss'
import '../styles/host.scss'
import ManageRoom from './hostpages/ManageRoom'

function HostPage() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/addquestion' element={<AddQuestion />} />
        <Route path='/gameroom' element={<GameRoom />} />
        <Route path='/manageroom' element={<ManageRoom />} />

        <Route
          path='/manageroom/viewquestions'
          element={<ViewEditQuestions />}
        />
      </Routes>
    </>
  )
}

function Welcome() {
  const navigate = useNavigate()

  return (
    <>
      <div className='flex-column'>
        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('./addquestion')
          }}
        >
          Add Question
        </button>
        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('./viewquestions')
          }}
        >
          View Questions
        </button>
        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('./gameroom')
          }}
        >
          Create Room
        </button>
        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('./manageroom')
          }}
        >
          Manage Room
        </button>
      </div>
    </>
  )
}

export default HostPage
