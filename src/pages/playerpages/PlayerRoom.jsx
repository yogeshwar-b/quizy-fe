import { useParams, useNavigate, useLocation } from 'react-router-dom'
// import ViewEditQuestions from '../ViewQuestions'
import PlayerQuestionCard from './PlayerQuestionCard'
import { useEffect } from 'react'
import { notify } from '../../Components/Snackbar'
import socket from '../../socket/socket'
import '../../styles/playerroom.scss'

export default function PlayerRoom() {
  // let { roomname } = useParams()
  const { state } = useLocation()
  const { playername, roomname, reqtype } = state
  /**
   * @todo - cleanup
   */
  const Navigate = useNavigate()

  /**
   *
   * @todo -
   */
  function JoinExistingRoom(req) {
    try {
      console.log('inside join existing room')
      socket.emit('joinroom', req, function test(resp) {
        console.log(resp)
        if (resp.msg == 'JoinSuccess') {
          notify('Room was found')
          localStorage.setItem('player', '')
          // props.isConnected({ connected: true, roomname: req.roomname })
          // Navigate(`./room/${playerrooomname.current.value}`)
        } else if (resp.msg == 'JoinFailed') {
          Navigate(`/`)
          notify('Room does not exist')
        } else {
          Navigate(`/`)
          notify('Error encountered.')
        }
      })
    } catch (error) {
      notify(error)
    }
  }
  useEffect(() => {
    console.log(roomname)
    JoinExistingRoom({
      type: reqtype,
      roomname: roomname,
      playername: playername
    })
  }, [])
  return (
    <div className='player-room'>
      <div>
        This is Player Room - {roomname} You joined as {playername}
      </div>
      <PlayerQuestionCard playername={playername} />
    </div>
  )
}
