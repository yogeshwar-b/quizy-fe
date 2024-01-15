import { useRef, useState } from 'react'
import socket from '../socket/socket'

function PlayerPage() {
  const roomnameref = useRef('')
  const [RoomConnected, changeRoomConnected] = useState(false)
  const [RoomExists, changeRoomExists] = useState('initial')
  socket.on('JoinedRoom', (arg) => {
    changeRoomConnected(true)
  })

  function ConnectRoom(roomname) {
    //console.log('sending join room')
    socket.emit(
      'join',
      { type: 'join', roomname: roomname },
      function (responseData) {
        //console.log(responseData.msg)
        if (responseData.msg == 'JoinSuccess') {
          //console.log('inside succss')
          changeRoomExists('Called to join room sucesss')
          changeRoomConnected(true)
        } else {
          changeRoomExists('Called to join room sucesss')
          console.log('could not join')
        }
      }
    )
  }

  return (
    <>
      {RoomConnected ? (
        <div>You are connected to the {roomnameref.current.value}</div>
      ) : (
        <div>
          <input
            type='text'
            name='roomname'
            id='roomname'
            ref={roomnameref}
            placeholder='Enter Room name'
          />
          <button
            onClick={() => {
              ConnectRoom(roomnameref.current.value)
            }}
          >
            Join Room
          </button>
          <br />
          {RoomExists != 'initial' ? (
            <div> Room does not exist,try again </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  )
}

export default PlayerPage
