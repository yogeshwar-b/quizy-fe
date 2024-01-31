import { useEffect, useState, useRef } from 'react'
import socket from '../../socket/socket'
import { useParams } from 'react-router-dom'
import { backendurl } from '../../../config'
import { notify } from '../../Components/Snackbar'
import '../../styles/viewquestions.css'

export default function SendQuestion(props) {
  var { roomname } = useParams()

  const [questionnumber, changequestionnumber] = useState(4)
  // const [questiondata,setquestiondata]
  const questiondata = useRef(0)
  // const questiondata = useRef([
  //   {
  //     _id: '65a8a2c1f5e20aa09adaddf4',
  //     questionid: '802b53c4daaf50369cf0dc0e84f34fc3',
  //     questiontxt: 'Waiting for First Quesition',
  //     choices: ['choice 1', 'choice 2', 'choice 3'],
  //     answer: 1,
  //     QuestionNumber: 4,
  //     __v: 0
  //   }
  // ])
  const [loadingQuestions, changeLoadingQuestions] = useState(true)
  useEffect(() => {
    console.log('get question number ' + questionnumber)
    console.log('props passed to view questions - ', props)
    // console.log(useParams())
    let RoomName = roomname
    console.log(RoomName)
    // let RoomName=props.RoomName
    fetch(`${backendurl}/quizhost/viewquestionbyroom/${RoomName}`, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((data) => {
        questiondata.current = data
        console.log(questiondata, data)
        changeLoadingQuestions(false)
      })
  }, [])
  console.log(questiondata.current)
  return (
    <div>
      {loadingQuestions ? (
        <div>loading questions...</div>
      ) : (
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
          {questiondata.current.map((q) => {
            if (q.QuestionNumber == questionnumber) {
              return (
                <div key={q.questionid} className='rounded-card'>
                  <div> Question {q.questiontxt}</div>
                  <div>
                    {q.choices?.map((choice) => {
                      return <div key={choice}>{choice}</div>
                    })}
                  </div>
                </div>
              )
            }
          })}
        </div>
      )}
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
