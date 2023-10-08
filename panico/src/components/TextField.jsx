import { View, Text, TextInput } from 'react-native'
import React from 'react'

const TextField = ({value, onChange, placeholder, keyboardType, label}) => {
  return (
    <View style={{backgroundColor: 'transparent', marginVertical: 1, padding: 6, borderRadius: 5}}>
      {/* <Text style={{fontSize:18, color: 'white'}}>{label}</Text> */}
      <TextInput value={value} 
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        style={{height: 60,
          margin: 12,
          padding: 10, borderRadius: 50, backgroundColor: 'white'
        }}
      />
    </View>
  )
}

export default TextField