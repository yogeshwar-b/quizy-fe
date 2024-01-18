import { generateSlug } from 'random-word-slugs'
import { useState, useRef } from 'react'
import socket from '../../socket/socket'
import { PropTypes } from 'prop-types'
import { notify } from '../../Components/Snackbar'
import { useNavigate } from 'react-router-dom'

export default function ManageRoom() {
  const [roomCreated, changeRoomCreated] = useState({
    connected: false,
    roomname: ''
  })
  const Navigate = useNavigate()

  const roomname = useRef(0)
  return roomCreated.connected ? (
    Navigate(`./room/${roomCreated.roomname}`)
  ) : (
    <AddRoom isConnected={changeRoomCreated} roomname={roomname} />
  )
}

function AddRoom(props) {
  const existingroomname = useRef(0)
  var newroomname = useRef(0)

  function CreateRoom(req) {
    socket.emit('createroom', req, function test(resp) {
      console.log(resp)
      if (resp.msg == 'CreateSuccess') {
        props.isConnected({ connected: true, roomname: req.roomname })
        // Navigate(`./room/${req.roomname}`)
        notify('Room was created')
      } else if (resp.msg == 'CreateFailed') {
        notify('Room already exists')
      } else {
        notify('Error encountered.')
      }
    })
  }
  function JoinExistingRoom(req) {
    socket.emit('joinroom', req, function test(resp) {
      if (resp.msg == 'JoinSuccess') {
        notify('Room was found')
        props.isConnected({ connected: true, roomname: req.roomname })
        // Navigate(`./room/${req.roomname}`)
      } else if (resp.msg == 'JoinFailed') {
        notify('Room does not exist')
      } else {
        notify('Error encountered.')
      }
    })
  }

  return (
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
              roomname: existingroomname.current.value
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
            newroomname = generateSlug()
            CreateRoom({ type: 'createroom', roomname: newroomname })
          }}
        >
          Create
        </button>
        <br />
      </div>
    </div>
  )
}

AddRoom.propTypes = {
  isConnected: PropTypes.func
}
