import { StyleSheet, View , Image } from 'react-native'
import React from 'react'
import { Text, VStack} from "native-base"
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/color';
import CustomTouchableOpacity from '../btn';
import ROUTES from '../../constants/NavigationRoutes';
import { useNavigation } from '@react-navigation/native';
const StackHeader = ({title,label}) => {
  const {goBack} = useNavigation()
  return (
    <VStack bg={colors.PRIMARY_COLOR} py={5} px={5} >
        <CustomTouchableOpacity onPress={()=>goBack()} >
            {
              title !== ROUTES.Home ?
              <AntDesign name="arrowleft" size={28} color="white" />
              : 
              <Image style={{height:30,width:30,resizeMode:'contain',borderWidth:1,borderColor:'white',borderRadius:15,padding:2}} source={require('../../../assets/icon.png')} alt="logo"  />
            } 
        </CustomTouchableOpacity>
        <Text color={'white'} fontSize={20} fontWeight={'bold'} >{label}</Text>
    </VStack>
  )
}

export default StackHeader

const styles = StyleSheet.create({})