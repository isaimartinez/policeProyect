import React from 'react'
import { Routes, Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RequireAuth, Layout} from './components'
import {Map, Login} from './pages/'
import {useOnLoad} from './hooks'

function App()  {
  const state = useSelector((state) => state)

  useOnLoad()


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