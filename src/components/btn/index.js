import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomTouchableOpacity = ({children , ...props}) => {
  return (
    <TouchableOpacity {...props} activeOpacity={.75}>
        {children}
    </TouchableOpacity>
  )
}

export default CustomTouchableOpacity