import React, {useEffect} from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RequireAuth, Layout} from './components'
import {Map, Login} from './pages/'
import {setIncidencias, setZones} from './redux/reducers/dataSlice'
import {onLoad, filterIncidencias} from './APIs/helpers'
import { socket } from './APIs/socket';
import {useOnLoad} from './hooks'

function App()  {
  const state = useSelector((state) => state)
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8085');

  useOnLoad(lastMessage)


  return (
    <div>
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className={'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'}>
          <div>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route path='login' element={<Login /> }/>
                {/* Private */}
                <Route element={<RequireAuth  />}>
                  <Route path="/" element={<Map />} />
                </Route>
              </Route>
            </Routes>
          </div>
          
        </div>
      </div>
    </div>
  )

}

export default App