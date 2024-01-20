import { useParams } from 'react-router-dom'

export default function PlayerRoom() {
  let { roomname } = useParams()

  return (
    <div>
      <div> This is Player Room - {roomname}</div>
      waiting for the game to start
    </div>
  )
}
