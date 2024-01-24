import { generateSlug } from 'random-word-slugs'
import { useRef } from 'react'
import socket from '../../socket/socket'
import { notify } from '../../Components/Snackbar'
import { useNavigate } from 'react-router-dom'
import PlayerLoginView from '../playerpages/PlayerLoginView'

export default function ManageRoom() {
  return <AddRoom />
}

function AddRoom() {
  const existingroomname = useRef(0)
  const playerrooomname = useRef(0)
  // const newroomname = useRef(0)
  const Navigate = useNavigate()

  function CreateRoom(req) {
    socket.emit('createroom', req, function test(resp) {
      console.log(resp)
      if (resp.msg == 'CreateSuccess') {
        Navigate(`./manageroom/${req.roomname}`)
        notify('Room was created')
      } else if (resp.msg == 'CreateFailed') {
        notify('Room already exists')
      } else {
        notify('Error encountered.')
      }
    })
  }
  function JoinExistingRoom(req) {
    try {
      console.log('inside join existing room')
      socket.emit('joinroom', req, function test(resp) {
        if (resp.msg == 'JoinSuccess') {
          notify('Room was found')
          // props.isConnected({ connected: true, roomname: req.roomname })
          Navigate(`./manageroom/${req.roomname}`)
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

  return (
    <div>
      <PlayerLoginView />
      <br />
      <div>
        <h2>Host View</h2>
        <div>
          <div>
            Connect to Existing Room
            <input
              type='text'
              id='roomname'
              ref={existingroomname}
              placeholder='enter name of existing room'
            />
            <button
              onClick={() => {
                console.log('joinroom called')
                JoinExistingRoom({
                  type: 'joinroom',
                  roomname: existingroomname.current.value,
                })
              }}
            >
              Connect
            </button>
          </div>
          <br />
          <div>
            Create New Room
            <button
              onClick={() => {
                CreateRoom({ type: 'createroom', roomname: generateSlug() })
              }}
            >
              Create
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
