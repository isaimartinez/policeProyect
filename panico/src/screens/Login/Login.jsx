import { View, Image, StatusBar } from 'react-native'
import React from 'react'
import {TextField, Button} from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo from '../../assets/estrella-removebg.png'
import footer from '../../assets/footer-removebg.png'
import LinearGradient from 'react-native-linear-gradient';


import {getHp} from '../../Apis/Dimensions'
import { useLogin } from './useLogin'

const Login = () => {
  const {phoneNumber, setPhoneNumber, name, setName, storeInfo} = useLogin()

  return (
    <KeyboardAwareScrollView style={{flex: 1, height:  getHp(1), backgroundColor: 'green'}}>
    <StatusBar barStyle={'light-conten'}/>
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{flex: 1, height: getHp(1)}}>
      <View style={{flex:1, marginHorizontal: 15,}}>
        <View style={{flex: 0.3}}/>
        <View style={{flex: 0.7, alignItems: 'center', paddingTop: 20}}>
          <Image source={logo} style={{width: 135, height: 135, borderRadius: 10}}/>
        </View>

        <View style={{ flex:2, justifyContent: 'space-around' }}>
          <View>
            <TextField placeholder={"Nombre"} label={"Nombre"} value={name} onChange={(t) => {setName(t)}}/>
            <TextField placeholder={"Número de Teléfono"} label={"Teléfono"} value={phoneNumber} onChange={(t) => {setPhoneNumber(t)}} keyboardType="numeric"/>
          </View>
          <View style={{padding: 6, margin: 12}}>
            <Button label={"Continuar"} onPress={storeInfo}
              styleBtn={{backgroundColor:"#102952", borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center'}}
              styleTxt={{color: "white", fontWeight: "500", fontSize: 20}}
            />
          </View>
        </View>
        <View style={{flex: 1}}/>
      </View>
    </LinearGradient>
    </KeyboardAwareScrollView>
  )
}

export default Login