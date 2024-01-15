import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AddQuestion } from './AddQuestion'
import GameRoom from './GameRoom'
import ViewQuestions from './ViewQuestions'
import '../styles/component.css'
import '../styles/host.css'

function HostPage() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/addquestion' element={<AddQuestion />} />
        <Route path='/viewquestions' element={<ViewQuestions />} />
        <Route path='/gameroom' element={<GameRoom />} />
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
      </div>
    </>
  )
}

export default HostPage
