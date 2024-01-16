import { useEffect, useReducer, useState } from 'react'
import { backendurl } from '../../config'
import { PropTypes } from 'prop-types'
import '../styles/viewquestions.css'

function ViewQuestions(props) {
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

  function HandleOnChoicesEdit(data) {
    dispatch({
      type: 'choices edit',
      data: data
    })
  }
  function HandleOnQuestionEdit(data) {
    dispatch({
      type: 'questionedit',
      data: data
    })
  }

  useEffect(() => {
    console.log('props passed to view questions - ', props)
    fetch(`${backendurl}/quizhost/viewquestionbysession/${props.SessionId}`, {
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
            handleChoicesEdit={HandleOnChoicesEdit}
            handleDelete={HandleOndelete}
            handleQuestionEdit={HandleOnQuestionEdit}
          />
        )
      })}
    </div>
  )
}
ViewQuestions.propTypes = {
  SessionId: PropTypes.string
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
  const [isEditing, changeIsEditing] = useState(false)
  return (
    <div className='rounded-card'>
      {isEditing ? (
        //Editing Component
        <>
          {/* <div>this is{ques.questiontxt}</div> */}
          <input
            type='text'
            value={ques.questiontxt}
            onChange={(e) => {
              props.handleQuestionEdit({ ...ques, questiontxt: e.target.value })
            }}
          />
          <textarea
            type='text'
            name='Choices'
            id='choicesinput'
            value={ques.choices.join('\n')}
            rows={ques.choices.length}
            onChange={(e) => {
              props.handleChoicesEdit({
                ...ques,
                choices: e.target.value.split('\n')
              })
            }}
          ></textarea>
          <div className='flex-reverse'>
            <button
              className='btn-round'
              disabled
              onClick={() => props.handleDelete()}
            >
              Delete
            </button>
            <button
              className='btn-round'
              onClick={() => {
                changeIsEditing(false)
                // props.handleEdit()
              }}
            >
              save
            </button>
          </div>
        </>
      ) : (
        <>
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
            <button
              className='btn-round'
              onClick={() => {
                changeIsEditing(true)
              }}
            >
              Edit
            </button>
          </div>
        </>
      )}
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
  handleQuestionEdit: PropTypes.method,
  handleChoicesEdit: PropTypes.method
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
    case 'questionedit':
      return questions.map((t) => {
        if (
          t.questionid === action.data.questionid &&
          t.sessionid === action.data.sessionid
        ) {
          return action.data
        } else {
          return t
        }
      })
    case 'choices edit':
      return questions.map((t) => {
        if (
          t.questionid === action.data.questionid &&
          t.sessionid === action.data.sessionid
        ) {
          return action.data
        } else {
          return t
        }
      })
    default:
      console.log('default case')
      return questions
  }
}

export default ViewQuestions
