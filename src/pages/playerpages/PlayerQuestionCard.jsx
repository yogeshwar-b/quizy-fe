import { notify } from '../../Components/Snackbar'
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle
} from 'react'
import '../../styles/playerquestioncard.css'
import socket from '../../socket/socket'
import { useParams, useNavigate } from 'react-router-dom'

export default function PlayerQuestionCard() {
  // const questionstate = sampledata
  var { roomname } = useParams()

  socket.on('receivednextquestion', (arg) => {
    // changereceiveddata(arg + '\n' + receiveddata)
    changeQuestionState(arg)
    // changedisable(false)
    choicesref.current.resetchoicestates()
    console.log('received question', arg)
  })
  const Navigate = useNavigate()
  function JoinExistingRoom(req) {
    try {
      console.log('inside join existing room')
      socket.emit('joinroom', req, function test(resp) {
        // console.log(resp)
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

  // const [disable, changedisable] = useState(false)
  const [questionstate, changeQuestionState] = useState({
    _id: 'xx',
    questionid: 'xx',
    questiontxt: 'Waiting for First Quesition',
    choices: [],
    answer: 0,
    __v: 0
  })

  const choicesref = useRef(null)
  return (
    <div>
      {/* <div> Player question card below</div> */}
      <div>{questionstate.questiontxt}</div>
      <Choices choicedata={questionstate.choices} ref={choicesref} />
    </div>
  )
}

const Choices = forwardRef(function Choices(props, ref) {
  const [ChoiceState, changeChoiceState] = useState({
    isSubmitted: false,
    Selection: -1
  })
  useImperativeHandle(ref, () => {
    return {
      resetchoicestates() {
        changeChoiceState({
          isSubmitted: false,
          Selection: -1
        })
      }
    }
  })

  let count = 0
  return (
    <div className='choices-list'>
      {props.choicedata?.map((choice) => {
        return !ChoiceState.isSubmitted ? (
          <button
            className='choice-button'
            id={count++}
            key={count}
            onClick={(e) => {
              // e.target.classList.add('submitted')
              changeChoiceState({
                isSubmitted: true,
                Selection: e.target.innerText
              })
              notify('choice submitted')
              //send e.target.id to backend
            }}
          >
            {choice}
          </button>
        ) : (
          <button
            disabled
            className={
              'choice-button ' +
              (ChoiceState.Selection === choice ? 'submitted' : '')
            }
            id={count++}
            key={count}
          >
            {choice}
          </button>
        )
      })}
    </div>
  )
})
