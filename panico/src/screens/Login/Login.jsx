import { View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import {TextField, Button} from '../../components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logo from '../../assets/estrella.jpg'
import footer from '../../assets/footer.jpeg'
import {getHp} from '../../Apis/Dimensions'
import { useLogin } from './useLogin'

const Login = () => {
  const {phoneNumber, setPhoneNumber, name, setName, storeInfo} = useLogin()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#F8FAFC"}}>
    <KeyboardAwareScrollView style={{flex: 1}}>

      <View style={{flex:1, margin:15, height:  getHp(0.9),}}>
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
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Login