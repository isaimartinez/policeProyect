import {useState, useEffect} from 'react'
import { Linking, Platform } from 'react-native'
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

  const handleCall = () => {
    console.log("handleCall")
    let phoneNumber = '';
  
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${911}';
    } else {
      phoneNumber = 'telprompt:${911}';
    }
  
    try {
      Linking.openURL(phoneNumber);
    } catch (err) {
      console.error('Failed to dial:', err);
    }
  };

  return {user, sendingReport,counter, setCounter, isVisible, setIsVisible, onPressIn, onPressOut, handleCall}
}