import { useEffect, useState } from 'react'
import socket from '../../socket/socket'
import { backendurl } from '../../../config'
import { notify } from '../../Components/Snackbar'

export default function SendQuestion(props) {
  const [questionnumber, changequestionnumber] = useState(0)
  useEffect(() => {
    console.log('get question number ' + questionnumber)
  }, [])
  return (
    <div>
      <div>SendQuestion</div>
      <button
        onClick={() => {
          sendquestionsocketcall(questionnumber, props.RoomName).then(
            changequestionnumber(questionnumber + 1)
          )
        }}
      >
        Send question number {questionnumber}
      </button>
    </div>
  )
}

/**
 * @todo - Make this a API call , where in backend on receiving it do a socket.emit to the channel with new question.
 * @param {*} questionnumber
 * @param {*} roomname
 */
async function sendquestionsocketcall(questionnumber, roomname) {
  try {
    console.log('sending question number ' + questionnumber)
    fetch(`${backendurl}/quizhost/sendquestion/${roomname}/${questionnumber}`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        notify('question sent')
      })
  } catch (error) {
    notify(error)
  }
}
