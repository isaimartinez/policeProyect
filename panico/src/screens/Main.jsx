import React,{useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import nueveOnce from '../assets/911.png'
import footer from '../assets/footer.jpeg'
import { generateReport } from '../Apis/Reports'
import {getCoords} from '../Apis/Geolocation'

let interval
const Main = () => {
  const {user} = useSelector((state) => state.main)
  const dispatch = useDispatch()

  const [counter, setCounter] = useState(5)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if(counter == 0) {
      clearInterval(interval)
      setIsVisible(false)
      setCounter(5)
      generateReport(user)
    }
  }, [counter])
  

  const onPressIn = () => {
    generateReport(user)
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


  return (
    <View style={{flex: 1,  justifyContent: 'center', backgroundColor: "#F8FAFC"}}>
      <View style={{flex: 0.5, alignItems: 'center',}}>
        <Image source={nueveOnce} resizeMode="stretch" style={{width: 170, height: 120, borderRadius: 10,  marginTop: 25}}/>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <TouchableOpacity style={{ minHeight: 200, minWidth: 200,backgroundColor: 'rgb(37, 99, 235)', alignItems: 'center', justifyContent: 'center', borderRadius: 100, shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.8,
          shadowRadius: 3,}}
          // onPress={handleSos}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={{color: "white", fontSize: 40}}>{!isVisible ? "S O S" : counter}</Text>
        </TouchableOpacity>
        <View style={{marginTop: 5}}>
          <Text style={{color: "#475569"}}>Manten presionado el botón por 5 segundos para dar alerta</Text>
        </View>
      </View>
      <View style={{flex: 0.5, justifyContent: 'flex-end', alignItems: 'center',}}>
        <Image source={footer} style={{width: 135, height: 135, borderRadius: 20}}
          resizeMode="contain"/>
      </View>
    </View>
  )
}

export default Main