import { useNavigate } from 'react-router-dom'
import '../styles/home.css'
import '../styles/component.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <div className='flex-row'>
        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('/host')
          }}
        >
          Host
        </button>

        <button
          className='btn-round dark-btn-round'
          onClick={() => {
            navigate('/player')
          }}
        >
          Player
        </button>
      </div>
    </div>
  )
}

export default Home
