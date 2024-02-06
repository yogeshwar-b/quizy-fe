import { useState } from 'react'
import { backendurl } from '../../../config'
import '../../styles/addquestion.scss'
import { PropTypes } from 'prop-types'
import { notify } from '../../Components/Snackbar'
import { useParams } from 'react-router-dom'

export function AddQuestion() {
  const { roomname } = useParams()
  const defaultformdata = {
    Question: '',
    Choices: [''],
    RoomName: '',
    Answer: '',
    QuestionId: ''
  }
  const [FormData, changeFormData] = useState(defaultformdata)
  const [SendingQuestion, changeSendingQuestion] = useState(false)

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
          roomname: roomname
        })
      }).then(async (response) => {
        if (response.status == 201) {
          notify('Question Added')
          changeFormData(defaultformdata)
        } else {
          notify('Failed to Add Question')
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
        </div>
      )}
    </form>
  )
}

AddQuestion.propTypes = {
  RoomName: PropTypes.string
}

export default AddQuestion
