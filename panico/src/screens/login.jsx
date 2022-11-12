import { View, Text, SafeAreaView, Image } from 'react-native'
import React,{useState} from 'react'
import {TextField, Button} from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { saveData } from '../redux/reducers/mainSlice'
import logo from '../assets/estrella.jpg'
import footer from '../assets/footer.jpeg'
const Login = () => {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState("")
  const [name, setName] = useState("")

  const storeInfo = () => {
    console.log("phone ", phoneNumber)
    console.log("name ", name)
    // Verificar if empty
    

    let data = {phoneNumber, name}
    dispatch(saveData({data, key:"userInfo"}))
  }

  return (
    <SafeAreaView style={{flex: 1, margin: 15}}>
      <View style={{flex: 0.7, alignItems: 'center'}}>
        <Image source={logo} style={{width: 135, height: 135, borderRadius: 10}}/>
      </View>

      <View style={{ flex:2, justifyContent: 'space-around' }}>
        <View style={{}}>
          <TextField placeholder={"Número de Teléfono"} label={"Teléfono"} value={phoneNumber} onChange={(t) => {setPhoneNumber(t)}} keyboardType="numeric"/>
          <TextField placeholder={"Nombre"} label={"Nombre"} value={name} onChange={(t) => {setName(t)}}/>
        </View>
        <View style={{}}>
          <Button label={"Continuar"} onPress={storeInfo}
            styleBtn={{backgroundColor:"#102952", borderRadius: 5, height: 50, alignItems: 'center', justifyContent: 'center'}}
            styleTxt={{color: "white", fontWeight: "500", fontSize: 20}}
          />
        </View>
      </View>

      <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={footer} style={{width: 135, height: 135, borderRadius: 20}}
          resizeMode="contain"
        />
      </View>

    </SafeAreaView>
  )
}

export default Login