import { useRef } from 'react'
import { notify } from '../../Components/Snackbar'
import { generateSlug } from 'random-word-slugs'
import socket from '../../socket/socket'
import { useNavigate } from 'react-router-dom'
import '../../styles/hostloginview.scss'
import '../../styles/defaultview.scss'

function HostLoginView({ className }) {
  const existingroomname = useRef(0)
  const existingroomsecret = useRef(0)
  const newroomname = useRef(0)
  const newroomsecret = useRef(0)
  const Navigate = useNavigate()

  function CreateRoom(req) {
    console.log('newroom request', req)
    // return
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

  /**
   *
   * @param {object} req Request object
   * @param {string} req.type type of request
   * @param {string} req.roomname name of the room to manage
   * @param {string} req.roomsecret secret of the room to manage
   */
  function ManageRoom(req) {
    try {
      console.log('inside manage room', req)
      socket.emit('manageroom', req, function test(resp) {
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
    <div className={className}>
      <div className='host-grid'>
        <h2>Host View</h2>
        <div>
          <div className='flex-col'>
            Connect to Existing Room
            <input
              type='text'
              id='roomname'
              ref={existingroomname}
              placeholder='enter name of existing room'
            />
            <input
              type='text'
              id='roomsecret'
              ref={existingroomsecret}
              placeholder='enter name of existing room'
            />
            <button
              onClick={() => {
                console.log('manageroom called')
                existingroomname.current.value &&
                existingroomsecret.current.value
                  ? ManageRoom({
                      type: 'manageroom',
                      roomname: existingroomname.current.value,
                      roomsecret: existingroomsecret.current.value
                    })
                  : notify('Please enter room details')
              }}
            >
              Connect
            </button>
          </div>
          <br />
          <div className='flex-col'>
            Create New Room
            <input
              type='text'
              id='newroomname'
              ref={newroomname}
              placeholder={generateSlug()}
            />
            <input
              type='text'
              id='newroomsecret'
              ref={newroomsecret}
              placeholder={generateSlug(1)}
            />
            <button
              onClick={() => {
                CreateRoom({
                  type: 'createroom',
                  roomname: newroomname.current.value
                    ? newroomname.current.value
                    : newroomname.current.placeholder,
                  roomsecret: newroomsecret.current.value
                    ? newroomsecret.current.value
                    : newroomsecret.current.placeholder
                })
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

export default HostLoginView
