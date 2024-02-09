import { useNavigate, useParams } from 'react-router-dom'
// import ViewEditQuestions from '../ViewQuestions'
import AddQuestion from '../hostpages/AddQuestion'
import SendQuestion from './SendQuestion'

/**
 *
 * @todo - view questions does not need props RoomName URL params are being used inside component. Need to remove it.
 */
export default function RoomPage() {
  let { roomname } = useParams()
  const Navigate = useNavigate()
  return (
    <div>
      <div>This is RoomPage {roomname}</div>
      <SendQuestion RoomName={roomname} />
      <button
        onClick={() => {
          Navigate('./viewquestions')
        }}
      >
        Edit questions
      </button>{' '}
      {/* <ViewQuestions RoomName={roomname} /> */}
    </div>
  )
}
