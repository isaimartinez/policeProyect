import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { generateReport } from '../../Apis/Reports'

let interval
export const useMain = () => {
  const {user, sendingReport} = useSelector((state) => state.main)

  const [counter, setCounter] = useState(5)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if(counter == 0) {
      clearInterval(interval)
      generateReport(user)
      setIsVisible(false)
      setCounter(5)
    }
  }, [counter])
  

  const onPressIn = () => {
    // generateReport(user)
    setIsVisible(true)
    interval = setInterval(() => {
      setCounter(prev => prev-1)
    }, 1000);
  }

  const onPressOut = () => {
    clearInterval(interval)
    setCounter(5)
    setIsVisible(false)
  }

  return {user, sendingReport,counter, setCounter, isVisible, setIsVisible, onPressIn, onPressOut}
}