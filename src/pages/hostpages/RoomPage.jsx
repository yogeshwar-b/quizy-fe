import { useParams } from 'react-router-dom'
import ViewQuestions from '../ViewQuestions'
import AddQuestion from '../AddQuestion'
export default function RoomPage() {
  let { roomname } = useParams()
  return (
    <div>
      <div>This is RoomPage {roomname}</div>
      <ViewQuestions RoomName={roomname} />
      <AddQuestion RoomName={roomname}></AddQuestion>
    </div>
  )
}
