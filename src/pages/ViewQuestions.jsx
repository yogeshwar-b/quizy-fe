import { useEffect, useState } from 'react'
import { backendurl } from '../../config'

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
    <div>
      {questiondata.map((q) => {
        return (
          <div key={q.questionid + q.sessionid}>
            {'question:' + q.questiontxt + ' id:' + q.questionid}
          </div>
        )
      })}
    </div>
  )
}

export default ViewQuestions
