import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'
import { backendurl } from '../../config'

const socket = io(backendurl, {
  autoConnect: false,
})
socket.connect()

// socket.on('hello', (arg) => {
//   console.log(arg)
// })

export default socket
