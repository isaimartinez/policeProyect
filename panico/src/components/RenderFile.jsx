import React from 'react'
import { View, Text, Image } from 'react-native'
import {getKindOfFile} from '../Apis/utils'
import {SH, SW} from '../Apis/Dimensions'

const RenderFile = ({file}) => {
  const kindOfFile = getKindOfFile(file?.uri)
  console.log("kindOfFile", kindOfFile)
  console.log("uri", file?.uri)
  if(kindOfFile == "pic") {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontWeight: "500", fontSize: 20, marginBottom: 5}}>Imagen Seleccionada</Text>
      <Image source={{uri: file?.uri}} style={{width: SH/3, height: SH/3}}/>
    </View>
  )

  }
}

export default RenderFile