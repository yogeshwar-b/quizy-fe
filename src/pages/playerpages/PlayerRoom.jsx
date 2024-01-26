import { useParams } from 'react-router-dom'
// import ViewEditQuestions from '../ViewQuestions'
import PlayerQuestionCard from './PlayerQuestionCard'

export default function PlayerRoom() {
  let { roomname } = useParams()
  /**
   * @todo - cleanup
   */
  return (
    <div>
      <div> This is Player Room - {roomname}</div>
      <PlayerQuestionCard />
    </div>
  )
}
