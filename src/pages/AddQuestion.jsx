import { useEffect, useState } from 'react'
import { backendurl } from '../../config'

export function AddQuestion() {
  const [FormData, changeFormData] = useState({
    Question: '',
    Choices: [''],
    SessionId: '',
    Answer: '',
    QuestionId: '',
  })
  const [SuccessMessage, changeSuccessMessage] = useState('')
  const [SendingQuestion, changeSendingQuestion] = useState(false)
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay))
  }

  const HandleSubmit = async (event) => {
    changeSendingQuestion(true)
    event.preventDefault()
    try {
      fetch(`${backendurl}/quizhost/savequestion`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          questiontxt: FormData.Question,
          questionid: FormData.QuestionId,
          choices: FormData.Choices.split('\n'),
          answer: FormData.Answer,
          sessionid: FormData.SessionId,
        }),
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
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2em',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onSubmit={HandleSubmit}
    >
      Add Question Page
      <label htmlFor='sessionidinput'>
        Session Id
        <input
          style={{ margin: '1em' }}
          id='sessionidinput'
          name='SessionId'
          type='text'
          placeholder='enter sessionid'
          value={FormData.SessionId}
          onChange={HandleChange}
        />
      </label>
      <label htmlFor='questioninput'>
        Question text
        <input
          style={{ margin: '1em' }}
          type='text'
          name='Question'
          id='questioninput'
          placeholder='enter question'
          value={FormData.Question}
          onChange={HandleChange}
        />
      </label>
      <label htmlFor='questionidinput'>
        Question Id
        <input
          style={{ margin: '1em' }}
          type='text'
          name='QuestionId'
          id='questionidinput'
          placeholder='enter questionid'
          value={FormData.QuestionId}
          onChange={HandleChange}
        />
      </label>
      <label htmlFor='choicesinput'>
        Choices
        <textarea
          style={{ margin: '1em' }}
          type='text'
          name='Choices'
          id='choicesinput'
          placeholder='enter choices'
          value={FormData.Choices}
          onChange={HandleChange}
        />
      </label>
      <label htmlFor='answerinput'>
        Answer
        <input
          style={{ margin: '1em' }}
          type='text'
          name='Answer'
          id='answerinput'
          placeholder='enter Answer'
          value={FormData.Answer}
          onChange={HandleChange}
        />
      </label>
      {SendingQuestion ? (
        <div>Sending Question...</div>
      ) : (
        <div>
          <input type='submit' value='Submit' />
          <span>{SuccessMessage}</span>
        </div>
      )}
    </form>
  )
}
