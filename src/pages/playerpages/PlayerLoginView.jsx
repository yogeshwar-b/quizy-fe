import { useRef } from 'react'
import socket from '../../socket/socket'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../Components/Snackbar'
import '../../styles/playerloginview.scss'
import '../../styles/component.scss'
import { generateSlug } from 'random-word-slugs'

export default function PlayerLoginView(props) {
  const Navigate = useNavigate()
  const playerroomname = useRef(0)
  const playername = useRef(0)
  /**
   *
   * @todo - clean up
   */
  function RequestToJoinRoom(req) {
    Navigate(`./room/${playerroomname.current.value}`, req)
  }
  return (
    <>
      <h2>Player View</h2>
      <div className='flex-col'>
        <div>
          Join as
          <input
            type='text'
            ref={playername}
            placeholder={generateSlug(2, {
              partsOfSpeech: ['adjective', 'noun'],
              categories: {
                adjective: ['color', 'appearance'],
                noun: ['animals']
              }
            })}
          />
        </div>
        <input type='text' ref={playerroomname} />
        <button
          className='btn-round'
          onClick={() => {
            RequestToJoinRoom({
              state: {
                type: 'joinroom',
                roomname: playerroomname.current.value,
                playername: playername.current.value
                  ? playername.current.value
                  : playername.current.placeholder
              }
            })
          }}
        >
          Join Room
        </button>
      </div>
    </>
  )
}
