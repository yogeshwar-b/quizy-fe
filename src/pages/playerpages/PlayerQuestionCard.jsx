import { notify } from '../../Components/Snackbar'
import { useEffect, useState } from 'react'
import '../../styles/playerquestioncard.css'
import socket from '../../socket/socket'
import { useParams, useNavigate } from 'react-router-dom'

/**
 * @todo- delete sample data
 */
const sampledata = {
  _id: '65a8a2c1f5e20aa09adaddf4',
  questionid: '802b53c4daaf50369cf0dc0e84f34fc3',
  questiontxt: 'My question 1',
  choices: ['choice1', 'choice2', 'choice3'],
  answer: 1,
  __v: 0
}

/**
 * @todo - Add reducer to handle events on the question choices.
 * @returns
 */
export default function PlayerQuestionCard() {
  // const questionstate = sampledata
  var { roomname } = useParams()

  socket.on('receivednextquestion', (arg) => {
    // changereceiveddata(arg + '\n' + receiveddata)
    changeQuestionState(arg)
    changedisable(false)
    console.log('received question', arg)
  })
  const Navigate = useNavigate()
  function JoinExistingRoom(req) {
    try {
      console.log('inside join existing room')
      socket.emit('joinroom', req, function test(resp) {
        console.log(resp)
        if (resp.msg == 'JoinSuccess') {
          notify('Room was found')
          // props.isConnected({ connected: true, roomname: req.roomname })
          // Navigate(`./room/${playerrooomname.current.value}`)
        } else if (resp.msg == 'JoinFailed') {
          Navigate(`/`)
          notify('Room does not exist')
        } else {
          Navigate(`/`)
          notify('Error encountered.')
        }
      })
    } catch (error) {
      notify(error)
    }
  }
  useEffect(() => {
    JoinExistingRoom({
      type: 'joinroom',
      roomname: roomname
    })
  }, [])

  const [disable, changedisable] = useState(false)
  const [questionstate, changeQuestionState] = useState({
    _id: '65a8a2c1f5e20aa09adaddf4',
    questionid: '802b53c4daaf50369cf0dc0e84f34fc3',
    questiontxt: 'Waiting for First Quesition',
    choices: [],
    answer: 1,
    __v: 0
  })
  let count = 0
  return (
    <div>
      <div> Player question card below</div>
      <div>{questionstate.questiontxt}</div>
      <div className='choices-list'>
        {questionstate.choices?.map((choice) => {
          return (
            <button
              disabled={disable}
              className='choice-button'
              id={count++}
              key={count}
              onClick={(e) => {
                console.log(e.target.innerText)
                changedisable(!disable)
                e.target.classList.add('submitted')
                notify('choice submitted')
                //send e.target.id to backend
              }}
            >
              {choice}
            </button>
          )
        })}
      </div>
    </div>
  )
}
