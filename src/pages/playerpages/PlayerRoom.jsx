import { useParams } from 'react-router-dom'
import ViewQuestions from '../ViewQuestions'
import PlayerQuestionCard from './PlayerQuestionCard'

export default function PlayerRoom() {
  let { roomname } = useParams()
  /**
   * @todo - cleanup
   */
  return (
    <div>
      <div> This is Player Room - {roomname}</div>
      waiting for the game to start
      <PlayerQuestionCard />
      <br />
      <br />
      <br />
      --- ⬇️⬇️⬇️🚫🚫🚫all questions view temporary 🚫🚫🚫⬇️⬇️⬇️---
      <br />
      {/* <ViewQuestions RoomName={roomname}></ViewQuestions> */}
    </div>
  )
}
