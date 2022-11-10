import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TextField = ({value, onChange, placeholder, keyboardType, label}) => {
  return (
    <View style={{backgroundColor: 'white', marginVertical: 5, padding: 6, borderRadius: 5}}>
      <Text style={{fontSize:18}}>{label}</Text>
      <TextInput value={value} 
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{height: 40,
          margin: 12,
          borderWidth: 0.8, borderColor: "rgb(100, 116, 139)",
          padding: 10, borderRadius: 7
        }}
      />
    </View>
  )
}

export default TextField