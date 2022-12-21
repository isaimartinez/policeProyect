import React, {useEffect} from 'react'
import { fetchData, fetchZones } from './APIs/index'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {BrowserRouter, Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Sidebar, Navbar, RequireAuth, Layout} from './components'
import {Map, Login} from './pages/'
import {setIncidencias, setZones} from './redux/reducers/dataSlice'
import {auth} from './redux/reducers/authSlice'

function App()  {
  const state = useSelector((state) => state)
  const {incidencias} = state.data
  const {authData} = state.auth
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8085');

  const dispatch = useDispatch()

  const onLoad = async () => {
    let user = JSON.parse(localStorage.getItem('profile'))
    if(user) {
      dispatch(auth(user))
    }
    let {data} = await fetchData()
    let zones = await fetchZones()
    console.log("zones", zones.data)
    dispatch(setIncidencias(data.data))
    dispatch(setZones(zones.data))
  }

  useEffect(() => {
      onLoad()
  }, [])
  const navigate = useNavigate()

  useEffect(() => {
    if(authData){
      navigate("/")
    } else {
      navigate("/login")

    }
  }, [authData])

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("lastMessage",lastMessage)
      let obj = JSON.parse(lastMessage.data)
      dispatch(setIncidencias([...incidencias, obj]))
    }
  }, [lastMessage, setIncidencias]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      {/* <BrowserRouter> */}
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
      {/* </BrowserRouter> */}
    </div>
  )

}

export default App