import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Box, HStack, Text, VStack } from 'native-base';
import colors from '../constants/color';
import { AntDesign } from '@expo/vector-icons';
import CustomTouchableOpacity from '../components/btn';
import ROUTES from '../constants/NavigationRoutes';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const Home = () => {
  const {navigate} = useNavigation()
  return (
    <VStack space={4} px={4} mt={4} >
      <CustomTouchableOpacity onPress={()=>navigate(ROUTES.CurrencyConverter,{isPinned:false})} >
        <HStack alignItems={'center'} px={4} bg={'white'} py={3} space={3} >
          <Box justifyContent={'center'} alignItems={'center'} width={45} height={45} rounded={'full'} bg={colors.PRIMARY_COLOR} >
            <FontAwesome name="exchange" size={22} color="white" />
          </Box>
          <Text fontSize={20} color="gray.600" >
            Currency Converter
          </Text>
          <Box ml={'auto'} >
          <AntDesign name="right" size={24} color={colors.PRIMARY_COLOR} />
          </Box>
        </HStack>
      </CustomTouchableOpacity>
      
      <CustomTouchableOpacity onPress={()=>navigate(ROUTES.OfflineResult)} >
        <HStack alignItems={'center'} px={4} bg={'white'} py={3} space={3} >
          <Box justifyContent={'center'} alignItems={'center'} width={45} height={45} rounded={'full'} bg={colors.PRIMARY_COLOR} >
            <MaterialIcons name="offline-share" size={24} color={'white'} />
          </Box>
          <Text fontSize={20} color="gray.600" >
            View Previous 5 Results
          </Text>
          <Box ml={'auto'} >
          <AntDesign name="right" size={24} color={colors.PRIMARY_COLOR} />
          </Box>
        </HStack>
      </CustomTouchableOpacity>

      <CustomTouchableOpacity onPress={()=>navigate(ROUTES.PinnedSearch)} >
        <HStack alignItems={'center'} px={4} bg={'white'} py={3} space={3} >
          <Box justifyContent={'center'} alignItems={'center'} width={45} height={45} rounded={'full'} bg={colors.PRIMARY_COLOR} >
            <AntDesign name="customerservice" size={24} color="white" />
          </Box>
          <Text fontSize={20} color="gray.600" >
            View Pinned Search
          </Text>
          <Box ml={'auto'} >
          <AntDesign name="right" size={24} color={colors.PRIMARY_COLOR} />
          </Box>
        </HStack>
      </CustomTouchableOpacity>

      <CustomTouchableOpacity onPress={()=>alert("Customer service feature comming soon !")} >
        <HStack alignItems={'center'} px={4} bg={'white'} py={3} space={3} >
          <Box justifyContent={'center'} alignItems={'center'} width={45} height={45} rounded={'full'} bg={colors.PRIMARY_COLOR} >
            <AntDesign name="customerservice" size={24} color="white" />
          </Box>
          <Text fontSize={20} color="gray.600" >
            Customer Service
          </Text>
          <Box ml={'auto'} >
          <AntDesign name="right" size={24} color={colors.PRIMARY_COLOR} />
          </Box>
        </HStack>
      </CustomTouchableOpacity>
    </VStack>
  )
}

export default Home