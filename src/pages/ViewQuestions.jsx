import { useEffect, useReducer, useState } from 'react'
import { backendurl } from '../../config'
import { PropTypes } from 'prop-types'
import '../styles/viewquestions.css'

function ViewQuestions() {
  // const [questiondata, changeQuestionData] = useState([''])
  const questiondata = ['']
  const [_isLoading, changeisLoading] = useState(true)
  const [questions, dispatch] = useReducer(questionsReducer, questiondata)

  function HandleOnLoad(data) {
    dispatch({
      type: 'initialize',
      data: data
    })
  }

  function HandleOndelete() {
    dispatch({
      type: 'delete'
    })
  }

  function HandleOnEdit() {
    dispatch({
      type: 'edit'
    })
  }

  useEffect(() => {
    fetch(`${backendurl}/quizhost/viewquestions`, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        changeisLoading(false)
        HandleOnLoad(data)
      })
  }, [])
  return _isLoading ? (
    <div>LOADING...</div>
  ) : (
    <div className='questions-flex'>
      {questions.map((q) => {
        return (
          <QuestionCard
            key={q.questionid + q.sessionid}
            ques={q}
            handleEdit={HandleOnEdit}
            handleDelete={HandleOndelete}
          />
        )
      })}
    </div>
  )
}
/**
 * @param {object} props
 * @param {object} props.ques
 * @param {string} props.ques.questionid  questionid
 * @param {string} props.ques.questiontxt questiontext
 * @param {string[]} props.ques.choices choices
 * @returns
 */
function QuestionCard(props) {
  let ques = props.ques
  return (
    <div className='rounded-card'>
      <div>{ques.questiontxt}</div>
      <div>
        {ques.choices.map((choice) => {
          return <div key={choice}>{choice}</div>
        })}
      </div>
      <div className='flex-reverse'>
        <button className='btn-round' onClick={() => props.handleDelete()}>
          Delete
        </button>
        <button className='btn-round' onClick={() => props.handleEdit()}>
          Edit
        </button>
      </div>
    </div>
  )
}

QuestionCard.propTypes = {
  ques: PropTypes.shape({
    questionid: PropTypes.string,
    questiontxt: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string)
  }),
  handleDelete: PropTypes.method,
  handleEdit: PropTypes.method
}

/**
 *
 * @param {*} questions questions array state object containing all the questions.
 * @param {*} action type of the action that reducer needs to perform on questions array state.
 * @todo Implement Edit,Delete methods once the backend has those methods.
 * @returns
 */
function questionsReducer(questions, action) {
  switch (action.type) {
    case 'initialize':
      console.log('Initialize case')
      return action.data
    case 'edit':
      console.log('edit case')
      return questions
    case 'delete':
      console.log('delete case')
      return questions
    default:
      console.log('default case')
      return questions
  }
}

export default ViewQuestions
