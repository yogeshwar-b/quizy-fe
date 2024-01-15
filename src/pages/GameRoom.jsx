import { useState, useEffect, useRef } from 'react'
import { backendurl } from '../../config'
import socket from '../socket/socket'

function GameRoom() {
  const roomname = useRef(0)
  const senddata = useRef(0)
  const [receiveddata, changereceiveddata] = useState('')
  socket.on('hello', (arg) => {
    changereceiveddata(arg + '\n' + receiveddata)
    console.log(arg)
  })
  useEffect(() => {
    console.log('inside room')
  }, [])
  return (
    <div>
      <input type='text' ref={roomname} placeholder='enter room name' />
      <button
        onClick={() => {
          socket.emit('join', roomname.current.value)
          // socket.emit('hello', 'world')

          // console.log(roomname.current.value)
        }}
      >
        connect to room
      </button>
      <br />
      <input type='text' ref={senddata} placeholder='enter data to send' />
      <button
        onClick={() => {
          // console.log(senddata.current.value)
          socket.emit('hello', {
            room: roomname.current.value,
            msg: senddata.current.value,
          })
          console.log(senddata.current.value)
        }}
      >
        send data to room
      </button>
      <br />
      <textarea
        name='receiveddata'
        id='receiveddata'
        cols='30'
        rows='10'
        placeholder='received data'
        value={receiveddata}
      ></textarea>
      <div>This is Game Room</div>
    </div>
  )
}

export default GameRoom
