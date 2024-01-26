import { notify } from '../../Components/Snackbar'
import { useEffect, useState } from 'react'
import '../../styles/playerquestioncard.css'
import socket from '../../socket/socket'

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

export default function PlayerQuestionCard() {
  // const questionstate = sampledata

  useEffect(() => {
    socket.on('receivednextquestion', (arg) => {
      // changereceiveddata(arg + '\n' + receiveddata)
      changeQuestionState(arg)
      // console.log('received question', arg)
    })
  })

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
                console.log(e.target)
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
