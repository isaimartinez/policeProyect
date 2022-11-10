import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({label, styleBtn, onPress, disabled, styleTxt}) => {
  return (
    <TouchableOpacity
      style={styleBtn}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styleTxt}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button