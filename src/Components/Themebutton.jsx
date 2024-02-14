import '../styles/themebutton.scss'
import { useState } from 'react'

export default function ThemeButton() {
  const [ThemeData, changeThemeData] = useState(false)
  return (
    <div>
      <label htmlFor='chkbox' className='label-button'>
        <input
          id='chkbox'
          type='checkbox'
          className='grid-stack checkbox-button'
          onChange={() => {
            console.log('clicked', ThemeData)
            /**
             * @todo - move these translation animations to states of mygrid
             */
            document
              .getElementById('mygrid')
              .classList.add('grid-stack-translate')
            setTimeout(() => {
              document
                .getElementById('mygrid')
                .classList.remove('grid-stack-translate')
            }, 300)
            changeThemeData(!ThemeData)
          }}
          checked
        />
        <div className='grid-stack' id='mygrid'>
          <img
            src={'/lightmode.svg'}
            id='lightmode-icon'
            className={
              'grid-item ' + (ThemeData ? 'lightmode' : 'lightmode-enable')
            }
            alt='light mode svg'
          />
          <img
            src='/darkmode.svg'
            id='darkmode-icon'
            className={
              'grid-item ' + (ThemeData ? 'darkmode-enable' : 'darkmode')
            }
            alt='light mode svg'
          />
        </div>
      </label>
    </div>
  )
}
