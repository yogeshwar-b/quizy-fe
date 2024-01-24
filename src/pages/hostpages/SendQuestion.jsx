import { useEffect, useState } from 'react'
import socket from '../../socket/socket'
import { backendurl } from '../../../config'
import { notify } from '../../Components/Snackbar'

export default function SendQuestion(props) {
  const [questionnumber, changequestionnumber] = useState(1)
  useEffect(() => {
    console.log('get question number ' + questionnumber)
  }, [])
  return (
    <div>
      <div>SendQuestion</div>
      <button
        onClick={() => {
          sendquestionsocketcall(questionnumber, props.RoomName).then(
            (resp) => {
              console.log('gotresp', resp)
              resp.message !== 'item not found'
                ? changequestionnumber(questionnumber + 1)
                : notify('limit reached')
            }
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
    return fetch(
      `${backendurl}/quizhost/sendquestion/${roomname}/${questionnumber}`,
      {
        method: 'get'
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data
        // console.log(data)
        // notify('question sent')
      })
  } catch (error) {
    notify(error)
  }
}
