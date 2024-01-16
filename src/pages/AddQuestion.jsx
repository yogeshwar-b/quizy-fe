import { useState } from 'react'
import { backendurl } from '../../config'
import '../styles/addquestion.css'
import { PropTypes } from 'prop-types'

export function AddQuestion(props) {
  const [FormData, changeFormData] = useState({
    Question: '',
    Choices: [''],
    SessionId: '',
    Answer: '',
    QuestionId: ''
  })
  const [SuccessMessage, changeSuccessMessage] = useState('')
  const [SendingQuestion, changeSendingQuestion] = useState(false)
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay))
  }

  const HandleSubmit = async (event) => {
    // console.log(props)
    changeSendingQuestion(true)
    event.preventDefault()
    try {
      fetch(`${backendurl}/quizhost/savequestion`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          questiontxt: FormData.Question,
          questionid: FormData.QuestionId,
          choices: FormData.Choices.split('\n'),
          answer: FormData.Answer,
          sessionid: props.SessionId
        })
      }).then(async (response) => {
        if (response.status == 201) {
          changeSuccessMessage('Question Added')
          await timeout(3000)
          changeSuccessMessage('')
        } else {
          changeSuccessMessage('Failed to Add question')
          await timeout(3000)
          changeSuccessMessage('')
        }
      })
    } catch (error) {
      console.log('error found')
      console.log(error)
    }
    changeSendingQuestion(false)
  }

  const HandleChange = (event) => {
    const { name, value } = event.target
    changeFormData({ ...FormData, [name]: value })
  }

  return (
    <form className='flex-form' onSubmit={HandleSubmit}>
      Add another question
      <ul className='flex-list'>
        <li className='flex-listitem'>
          <label htmlFor='questioninput' className='label-flex'>
            Question text
          </label>
          <input
            type='text'
            name='Question'
            id='questioninput'
            placeholder='enter question'
            value={FormData.Question}
            onChange={HandleChange}
            className='input-flex'
          />
        </li>
        <li className='flex-listitem'>
          <label htmlFor='choicesinput' className='label-flex'>
            Choices
          </label>
          <textarea
            type='text'
            name='Choices'
            id='choicesinput'
            placeholder='enter choices'
            value={FormData.Choices}
            onChange={HandleChange}
            className='input-flex'
          />
        </li>
        <li className='flex-listitem'>
          <label htmlFor='answerinput' className='label-flex'>
            Answer
          </label>
          <input
            type='text'
            name='Answer'
            id='answerinput'
            placeholder='enter Answer'
            value={FormData.Answer}
            onChange={HandleChange}
            className='input-flex'
          />
        </li>
      </ul>
      {SendingQuestion ? (
        <div>Sending Question...</div>
      ) : (
        <div>
          <input type='submit' value='Submit' className='btn-round' />
          <span>{SuccessMessage}</span>
        </div>
      )}
    </form>
  )
}

AddQuestion.propTypes = {
  SessionId: PropTypes.string
}

export default AddQuestion
