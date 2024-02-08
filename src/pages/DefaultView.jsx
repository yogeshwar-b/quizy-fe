import PlayerLoginView from '../pages/playerpages/PlayerLoginView'
import HostLoginView from '../pages/hostpages/HostLoginView'
import './../styles/defaultview.scss'

export default function DefaultView() {
  return (
    <div className='flex-default'>
      <PlayerLoginView />
      <div />
      <HostLoginView />
    </div>
  )
}
