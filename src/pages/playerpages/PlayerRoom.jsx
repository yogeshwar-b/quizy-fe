import { useParams, useNavigate } from 'react-router-dom'
// import ViewEditQuestions from '../ViewQuestions'
import PlayerQuestionCard from './PlayerQuestionCard'
import { useEffect } from 'react'
import { notify } from '../../Components/Snackbar'
import socket from '../../socket/socket'

export default function PlayerRoom() {
  let { roomname } = useParams()
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
        // console.log(resp)
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
    JoinExistingRoom({
      type: 'joinroom',
      roomname: roomname
    })
  }, [])
  return (
    <div>
      <div> This is Player Room - {roomname}</div>
      <PlayerQuestionCard />
    </div>
  )
}
