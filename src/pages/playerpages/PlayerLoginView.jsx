import { useRef } from 'react'
import socket from '../../socket/socket'
import { useNavigate } from 'react-router-dom'
import { notify } from '../../Components/Snackbar'
import '../../styles/playerloginview.scss'
import '../../styles/component.scss'
import { generateSlug } from 'random-word-slugs'
import '../../styles/defaultview.scss'

export default function PlayerLoginView({ className }) {
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
    <div className={className}>
      <div className='player-grid'>
        <h2 className='grid-span-2'>Player View</h2>
        <label htmlFor='playername'>Join as</label>
        <input
          id='playername'
          type='text'
          className='soft-input'
          ref={playername}
          placeholder={generateSlug(2, {
            partsOfSpeech: ['adjective', 'noun'],
            categories: {
              adjective: ['color', 'appearance'],
              noun: ['animals']
            }
          })}
        />
        <label htmlFor='playerrom'>Roomname</label>
        <input
          id='playerroom'
          type='text'
          className='soft-input'
          placeholder='Enter Room Name'
          ref={playerroomname}
        />

        <button
          className='soft-button grid-span-2'
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
    </div>
  )
}
