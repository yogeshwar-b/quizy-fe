import { notify } from '../../Components/Snackbar'
import { useState } from 'react'
import '../../styles/playerquestioncard.css'

/**
 * @todo- delete sample data
 */
const sampledata = {
  _id: '65a8a2c1f5e20aa09adaddf4',
  questionid: '802b53c4daaf50369cf0dc0e84f34fc3',
  questiontxt: 'My question 1',
  choices: ['choice1', 'choice2', 'choice3'],
  answer: 1,
  __v: 0,
}

export default function PlayerQuestionCard() {
  const question = sampledata
  const [disable, changedisable] = useState(false)
  let count = 0
  return (
    <div>
      <div> Player question card</div>
      <div>{question.questiontxt}</div>
      <div className='choices-list'>
        {question.choices.map((choice) => {
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
