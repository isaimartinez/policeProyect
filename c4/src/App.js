import React, {useEffect, useState} from 'react'
import { fetchData, getAddress } from './APIs/index'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {Sidebar, Navbar} from './components'
import {Main} from './pages/'
import {setIncidencias} from './redux/reducers/dataSlice'

function App()  {
  const state = useSelector((state) => state)
  const {activeMenu} = state.view
  const {incidencias} = state.data
  
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8085');

  const dispatch = useDispatch()

  const onLoad = async () => {
    let {data} = await fetchData()
    dispatch(setIncidencias(data.data))
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
          {activeMenu ? (
            <div
              className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'
            >
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >

            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar/>
            </div>

            <div>
              <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/C4' element={<Main/>}/>
              </Routes>
            </div>
            
          </div>
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App