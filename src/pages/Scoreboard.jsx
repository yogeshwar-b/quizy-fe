import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backendurl } from '../../config'

function Scoreboard() {
  const { roomname } = useParams()
  const [isScoreAvailable, ChangeScoreAvailable] = useState(false)
  const [ScoreValues, ChangeScoreValues] = useState(null)
  useEffect(() => {
    fetch(`${backendurl}/utility/scoreboard/${roomname}`, {
      method: 'get'
    })
      .then((resp) => resp.json())
      .then((resp) => {
        ChangeScoreValues(resp.playersubmissions)
        // console.log(resp.playersubmissions)
        ChangeScoreAvailable(true)
      })
  }, [])

  return (
    <div>
      This is scoreboard for {roomname}
      {isScoreAvailable ? (
        <ScoreBoardTable scores={ScoreValues} />
      ) : (
        <div>Loading Scoreboard...</div>
      )}
    </div>
  )
}

function ScoreBoardTable({ scores }) {
  return (
    <table>
      <thead>
        <tr>
          <td> Player Name</td>
          <td> Player Score</td>
        </tr>
      </thead>
      <tbody>
        {scores.map((item) => {
          return (
            <tr key={item.playername}>
              <td>{item.playername}</td>
              <td>{item.score}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Scoreboard
