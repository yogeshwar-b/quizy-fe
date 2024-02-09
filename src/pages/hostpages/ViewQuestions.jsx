import { useEffect, useReducer, useState } from 'react'
import { backendurl } from '../../../config'
import { useParams } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import '../../styles/viewquestions.scss'
import { notify } from '../../Components/Snackbar'
import AddQuestion from './AddQuestion'

function ViewEditQuestions() {
  return (
    <>
      <ViewQuestions />
      <AddQuestion></AddQuestion>
    </>
  )
}

function ViewQuestions(props) {
  // const [questiondata, changeQuestionData] = useState([''])
  var { roomname } = useParams()
  console.log(roomname, useParams())
  // props.RoomName = roomname
  const questiondata = ['']
  const [_isLoading, changeisLoading] = useState(true)
  const [questions, dispatch] = useReducer(questionsReducer, questiondata)

  function HandleOnLoad(data) {
    dispatch({
      type: 'initialize',
      data: data
    })
  }

  function HandleOndelete(data) {
    dispatch({
      type: 'delete',
      data: data
    })
  }

  function HandleOnEdit(data) {
    dispatch({
      type: 'edit',
      data: data
    })
  }

  async function HandleOnEditSave(data) {
    await dispatch({
      type: 'editsave',
      data: data
    })
  }
  useEffect(() => {
    console.log('props passed to view questions - ', props)
    // console.log(useParams())
    let RoomName = roomname
    // let RoomName=props.RoomName
    fetch(`${backendurl}/quizhost/viewquestionbyroom/${RoomName}`, {
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
      {questions?.map((q) => {
        return q !== null ? (
          <QuestionCard
            key={q.questionid + q.roomname}
            ques={q}
            handleDelete={HandleOndelete}
            handleEdit={HandleOnEdit}
            handleEditSave={HandleOnEditSave}
          />
        ) : (
          <div> </div>
        )
      })}
    </div>
  )
}
ViewQuestions.propTypes = {
  RoomName: PropTypes.string
}

/**
 * @param {object} props
 * @param {object} props.ques
 * @param {string} props.ques.questionid  questionid
 * @param {string} props.ques.questiontxt questiontext
 * @param {number} props.ques.answer answer
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
              props.handleEdit({
                ...ques,
                questiontxt: e.target.value
              })
            }}
          />
          <textarea
            type='text'
            name='Choices'
            id='choicesinput'
            value={ques.choices.join('\n')}
            rows={ques.choices.length}
            onChange={(e) => {
              props.handleEdit({
                ...ques,
                choices: e.target.value.split('\n')
              })
            }}
          ></textarea>
          <input
            type='number'
            name='answer'
            id='answerinput'
            value={Number(ques.answer)}
            onChange={(e) => {
              props.handleEdit({
                ...ques,
                answer: Number(e.target.value)
              })
            }}
          />
          <div className='flex-reverse'>
            <button className='btn-round' disabled>
              Delete
            </button>
            <button
              className='btn-round'
              onClick={async () => {
                await EditQuestionApiCall({
                  ...ques,
                  questiontxt: ques.questiontxt,
                  choices: ques.choices
                }).then((resp) => {
                  if (resp.status == 200) {
                    notify('update success')
                    props.handleEditSave({
                      ...ques,
                      newquestionid: resp.newQuestionid
                    })
                  } else {
                    notify('update failed - Please refresh')
                  }
                  changeIsEditing(false)
                })
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
            {ques.choices?.map((choice) => {
              return <div key={choice}>{choice}</div>
            })}
          </div>
          <div>Answer: {ques.answer}</div>
          <div className='flex-reverse'>
            <button
              className='btn-round'
              onClick={() => props.handleDelete({ ...ques })}
            >
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
    choices: PropTypes.arrayOf(PropTypes.string),
    answer: PropTypes.number
  }),
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleEditSave: PropTypes.func
}

/**
 *
 * @param {*} questions questions array state object containing all the questions.
 * @param {*} action type of the action that reducer needs to perform on questions array state.
 * @returns
 */
function questionsReducer(questions, action) {
  switch (action.type) {
    case 'initialize':
      console.log('Initialize case')
      return action.data
    case 'delete':
      console.log('delete case', questions, action.data)
      return questions?.filter((t) => {
        if (
          t.questionid === action.data.questionid &&
          t.roomname === action.data.roomname
        ) {
          DeleteQuestionApiCall(t.questionid, t.roomname)
          return false
        } else {
          return true
        }
      })
    case 'editsave':
      return questions.map((t) => {
        if (
          t.questionid === action.data.questionid &&
          t.roomname === action.data.roomname
        ) {
          return { ...t, questionid: action.data.newquestionid }
        } else {
          return t
        }
      })
    case 'edit':
      return questions.map((t) => {
        if (
          t.questionid === action.data.questionid &&
          t.roomname === action.data.roomname
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

async function EditQuestionApiCall(newdata) {
  try {
    return fetch(`${backendurl}/quizhost/editquestion`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newdata,
        questiontxt: newdata.questiontxt,
        choices: newdata.choices,
        answer: newdata.answer
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message == 'Updated Successfully') {
          return { status: 200, newQuestionid: response.newQuestionid }
        } else {
          return { status: 400 }
        }
      })
  } catch (error) {
    console.log('error found')
    console.log(error)
    return { status: 400 }
  }
}

/**
 *
 * @param {*} questionid
 * @param {*} roomname
 * @todo - Send back delete status so that reducer can decide to skip the item from the filter.
 */
function DeleteQuestionApiCall(questionid, roomname) {
  fetch(`${backendurl}/quizhost/deletequestion/${questionid}/${roomname}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (response.status == 200) {
      notify('Delete Success')
    } else {
      notify('Delete Failed')
    }
  })
}

export default ViewEditQuestions
