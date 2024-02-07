import PlayerLoginView from '../pages/playerpages/PlayerLoginView'
import HostLoginView from '../pages/hostpages/HostLoginView'

export default function DefaultView() {
  return (
    <div>
      <PlayerLoginView />
      <br />
      <HostLoginView />
    </div>
  )
}
