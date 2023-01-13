import {useEffect} from 'react'
import {onLoad, filterIncidencias} from './APIs/helpers'
import {useNavigate} from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { wsActions } from './APIs/socket';
import { useSelector, useDispatch } from 'react-redux'


export const useOnLoad = () => {
  const state = useSelector((state) => state)
  const {authData} = state.auth
  const {incidencias, selectedZones} = state.data
  const navigate = useNavigate()
  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8085');

  useEffect(() => {
    onLoad()
    console.log("hey")
  }, [])

  useEffect(() => {
    if(authData){
      navigate("/")
    } else {
      navigate("/login")

    }
  }, [authData])

  useEffect(() => {
    if (lastMessage !== null) {
      let data = JSON.parse(lastMessage.data)
      console.log("lastMessage", data)
      wsActions(data)
    }
  }, [lastMessage]);


  useEffect(() => {
    filterIncidencias([...incidencias],[...selectedZones])
  }, [selectedZones, incidencias])

}

//  const connectionStatus = {
//     [ReadyState.CONNECTING]: 'Connecting',
//     [ReadyState.OPEN]: 'Open',
//     [ReadyState.CLOSING]: 'Closing',
//     [ReadyState.CLOSED]: 'Closed',
//     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
//   }[readyState];
