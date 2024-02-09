import PlayerLoginView from '../pages/playerpages/PlayerLoginView'
import HostLoginView from '../pages/hostpages/HostLoginView'
import './../styles/defaultview.scss'

export default function DefaultView() {
  return (
    <div className='disp-1'>
      <PlayerLoginView className='player-flex' />
      <div className='divider' />
      <HostLoginView className='host-flex' />
    </div>
  )
}
