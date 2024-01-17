import { generateSlug } from 'random-word-slugs'
import { useState, useRef } from 'react'
import socket from '../../socket/socket'
import ViewQuestions from '../ViewQuestions'
import AddQuestion from '../AddQuestion'
import { PropTypes } from 'prop-types'

/**
 * @todo Get the questions only belonging to the session
 *
 */
export default function ManageRoom() {
  const [roomCreated, changeRoomCreated] = useState({
    connected: false,
    roomname: ''
  })
  const roomname = useRef(0)
  return roomCreated.connected ? (
    <div>
      You are now connected to
      <div
        style={{
          display: 'inline',
          textDecorationLine: 'underline',
          textDecorationThickness: '.1rem',
          padding: '0 .5rem 0 .5rem',
          fontWeight: 500
        }}
      >
        {roomCreated.roomname}
      </div>
      room. Following are all the questions in the server.
      <ViewQuestions SessionId={roomCreated.roomname} />
      <AddQuestion SessionId={roomCreated.roomname} />
    </div>
  ) : (
    <AddRoom isConnected={changeRoomCreated} roomname={roomname} />
  )
}

function AddRoom(props) {
  const existingroomname = useRef(0)
  var newroomname = useRef(0)
  const [errormessage, changeErrorMessage] = useState('')

  function ConnectRoom(req) {
    socket.emit('join', req, function test(resp) {
      console.log('got message on connect', resp)
      if (
        (req.type == 'create' && resp.msg == 'CreateSuccess') ||
        (req.type == 'join' && resp.msg == 'JoinSuccess')
      ) {
        props.isConnected({ connected: true, roomname: req.roomname })
      } else {
        // console.log('something wrong' + resp.msg)
        if (resp.msg == 'RoomDoesNotExist') {
          changeErrorMessage('Room does not exist')
        } else {
          changeErrorMessage('Error Encountered:' + resp.msg)
        }
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
            console.log('connect called')
            ConnectRoom({
              type: 'join',
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
        {/* <input
          type='text'
          id='newroomname'
          ref={newroomname}
          placeholder='enter name of the new room'
        /> */}
        <button
          onClick={() => {
            newroomname = generateSlug()
            ConnectRoom({ type: 'create', roomname: newroomname })
          }}
        >
          Create
        </button>
        <br />
        <div>{errormessage}</div>
      </div>
    </div>
  )
}

AddRoom.propTypes = {
  isConnected: PropTypes.func
}
