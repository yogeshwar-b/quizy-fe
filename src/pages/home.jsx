import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* temporarily writing the css inline, need to move this to a css file or use tailwind */}
      <div
        style={{
          padding: '3em',
          display: 'flex',
          flexDirection: 'column',
          height: '5em',
          width: '10em',
          justifyContent: 'center',
          gap: '3em',
        }}
      >
        <button
          onClick={() => {
            navigate('/host')
            console.log('this is host')
          }}
        >
          Host
        </button>

        <button
          onClick={() => {
            navigate('/player')
            console.log('this is host')
          }}
        >
          Player
        </button>
      </div>
    </div>
  )
}

export default Home
