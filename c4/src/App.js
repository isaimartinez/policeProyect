import React, {useEffect, useState} from 'react'
import { fetchData, getAddress, fetchZones } from './APIs/index'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Sidebar, Navbar} from './components'
import {Map, Login} from './pages/'
import {setIncidencias, setZones} from './redux/reducers/dataSlice'

function App()  {
  const state = useSelector((state) => state)
  const {activeMenu} = state.view
  const {incidencias} = state.data
  
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8085');

  const dispatch = useDispatch()

  const onLoad = async () => {
    console.log("onload")
    let {data} = await fetchData()
    let zones = await fetchZones()
    console.log("jey", zones)
    dispatch(setIncidencias(data.data))
    dispatch(setZones(zones.data))
  }


  useEffect(() => {
      onLoad()
  }, [])

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
      <BrowserRouter>
        <div className='flex relative dark:bg-main-dark-bg'>
          <div className={'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'}>
            <div>
              <Routes>
                <Route path='/' element={<Map/>}/>
                <Route path='/C4' element={<Map/>}/>
                <Route path='/login' element={<Login/>}/>
              </Routes>
            </div>
            
          </div>
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App