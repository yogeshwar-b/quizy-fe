import { useParams } from 'react-router-dom'
import ViewQuestions from '../ViewQuestions'
import AddQuestion from '../AddQuestion'
import SendQuestion from './SendQuestion'
export default function RoomPage() {
  let { roomname } = useParams()
  return (
    <div>
      <div>This is RoomPage {roomname}</div>
      <SendQuestion RoomName={roomname} />
      <ViewQuestions RoomName={roomname} />
      <AddQuestion RoomName={roomname}></AddQuestion>
    </div>
  )
}
