import { notify } from '../../Components/Snackbar'
import { backendurl } from '../../../config'
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

export default function PlayerQuestionCard(props) {
  // const questionstate = sampledata
  var { roomname } = useParams()
  const playername = props.playername

  useEffect(() => {
    socket.on('submitchoices', (arg) => {
      console.log('submit choices', arg, playername)
      // return
      try {
        fetch(`${backendurl}/player/submitchoices`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            roomname: roomname,
            playername: playername,
            playersubmissions: localStorage.getItem(playername)
          })
        }).then(async (response) => {
          if (response.status == 201) {
            notify('submitted choices')
          } else {
            notify('Failed to submit')
          }
        })
      } catch (error) {
        console.log('error found')
        console.log(error)
      }
    })
    socket.on('receivednextquestion', (arg) => {
      // changereceiveddata(arg + '\n' + receiveddata)
      changeQuestionState(arg)
      // changedisable(false)
      choicesref.current.resetchoicestates()
      console.log('received question', arg)
    })
    return () => {
      // Anything in here is fired on component unmount.
      console.log('component unmounted')
      socket.off('submitchoices')
      socket.off('receivednextquestion')
    }
  })

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
      <Choices
        choicedata={questionstate.choices}
        playername={playername}
        ref={choicesref}
      />
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
              let prev = localStorage.getItem(props.playername)
              localStorage.setItem(props.playername, prev + e.target.id + ',')
              console.log(localStorage, e.target.innerText)
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
