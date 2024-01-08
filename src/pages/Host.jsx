import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AddQuestion } from './AddQuestion'
import ViewQuestions from './ViewQuestions'

function HostPage() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/addquestion' element={<AddQuestion />} />
        <Route path='/viewquestions' element={<ViewQuestions />} />
      </Routes>
    </>
  )
}

function Welcome() {
  const navigate = useNavigate()

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '6em',
          gap: '2em',
        }}
      >
        <button
          onClick={() => {
            navigate('./addquestion')
          }}
        >
          Add Question
        </button>
        <button
          onClick={() => {
            navigate('./viewquestions')
          }}
        >
          View Questions
        </button>
      </div>
    </>
  )
}

export default HostPage
