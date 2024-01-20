import { useRef } from 'react'
import socket from '../../socket/socket'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../Components/Snackbar'

export default function PlayerLoginView(props) {
  const Navigate = useNavigate()
  const playerrooomname = useRef(0)
  function JoinExistingRoom(req) {
    try {
      console.log('inside join existing room')
      socket.emit('joinroom', req, function test(resp) {
        console.log(resp)
        if (resp.msg == 'JoinSuccess') {
          notify('Room was found')
          // props.isConnected({ connected: true, roomname: req.roomname })
          Navigate(`./room/${playerrooomname.current.value}`)
        } else if (resp.msg == 'JoinFailed') {
          notify('Room does not exist')
        } else {
          notify('Error encountered.')
        }
      })
    } catch (error) {
      notify(error)
    }
  }
  // useEffect(() => {})
  return (
    <>
      <h2>Player View</h2>
      <input type='text' ref={playerrooomname} />
      <button
        onClick={() => {
          JoinExistingRoom({
            type: 'joinroom',
            roomname: playerrooomname.current.value,
          })
        }}
      >
        Join Room
      </button>
    </>
  )
}
