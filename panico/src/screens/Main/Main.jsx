import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useMain } from './useMain'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Main = () => {

  const { sendingReport, counter, isVisible, onPressIn, onPressOut, handleCall} = useMain()

  

  return (
    <View style={{flex: 1,  justifyContent: 'center', backgroundColor: "#F8FAFC"}}>
      <View style={{flex: 0.1, alignItems: 'center',}}>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity style={{ minHeight: 200, minWidth: 200, backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center', borderRadius: 100, shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.8,
          shadowRadius: 3,}}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          {
            !sendingReport ? (
              <Text style={{color: "white", fontSize: 40}}>{!isVisible ? "S O S" : counter}</Text>
            ) : (
              <ActivityIndicator color={"white"}/>
            )
          }
          
        </TouchableOpacity>
        <View style={{marginTop: 20, marginHorizontal: 100, alignItems: 'center'}}>
          <Text style={{color: "#475569", textAlign: 'center'}}>Manten presionado el botón por 5 segundos para dar alerta</Text>
        </View>

      </View>
      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center',}}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={handleCall}>
          <Icon name="phone" size={30} color="#64748b" style={{marginBottom: 10}}/>
          <Text>Llamada de emergencia 911</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Main