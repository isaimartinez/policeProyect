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
  // const { sendMessage, lastMessage, readyState } = useWebSocket('wss://alpha-colon-b486ce862e2a.herokuapp.com:8085');
  const { sendMessage, lastMessage, readyState } = useWebSocket('wss://alpha-colon-b486ce862e2a.herokuapp.com')

  useEffect(() => {
    if(authData){
      navigate("/")
    } else {
      navigate("/login")
    }
  }, [authData])

  useEffect(() => {
    if (lastMessage !== null && lastMessage.data != 'ping') {
      let data = JSON.parse(lastMessage.data)
      console.log("lastMessage", data)
      wsActions(data)
    }
  }, [lastMessage]);


  useEffect(() => {
    filterIncidencias([...incidencias],[...selectedZones])
  }, [selectedZones, incidencias])

}