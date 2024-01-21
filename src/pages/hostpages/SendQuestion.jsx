import { useEffect, useState } from 'react'
import socket from '../../socket/socket'

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
          sendquestionsocketcall(questionnumber, props.RoomName)
          changequestionnumber(questionnumber + 1)
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
    socket.emit(
      'sendquestion',
      { questionnumber: questionnumber, roomname: roomname },
      function test(resp) {
        if (resp.msg == 'QuestionSent') {
          notify('Question was sent')
        } else {
          notify('ERROR Question not sent')
        }
      }
    )
  } catch (error) {
    notify(error)
  }
}
