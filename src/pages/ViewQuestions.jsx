import { useEffect, useState } from 'react'
import { backendurl } from '../../config'
import { PropTypes } from 'prop-types'

function ViewQuestions() {
  const [questiondata, changeQuestionData] = useState([''])
  const [_isLoading, changeisLoading] = useState(true)

  useEffect(() => {
    fetch(`${backendurl}/quizhost/viewquestions`, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        changeisLoading(false)
        console.log(data)
        changeQuestionData(data)
      })
  }, [])
  return _isLoading ? (
    <div>LOADING...</div>
  ) : (
    <div className='flex-column'>
      {questiondata.map((q) => {
        return <QuestionCard key={q.questionid + q.sessionid} ques={q} />
      })}
    </div>
  )
}
/**
 * @param {object} props
 * @param {object} props.ques
 * @param {string} props.ques.questionid  questionid
 * @param {string} props.ques.questiontxt questiontext
 * @param {string[]} props.ques.choices choices
 * @returns
 */
function QuestionCard(props) {
  let ques = props.ques
  return (
    <div className='rounded-card'>
      <div>{ques.questiontxt}</div>
      <div>
        {ques.choices.map((choice) => {
          return <div key={choice}>{choice}</div>
        })}
      </div>
    </div>
  )
}

QuestionCard.propTypes = {
  ques: PropTypes.shape({
    questionid: PropTypes.string,
    questiontxt: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.string),
  }),
}

export default ViewQuestions
