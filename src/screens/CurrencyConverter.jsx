import React, { useState } from 'react'
import { Box, HStack, KeyboardAvoidingView, ScrollView, Text, VStack, View } from 'native-base'
import colors from '../constants/color'
import { TextInput } from 'react-native'
import ROUTES from '../constants/NavigationRoutes'
import CountryDropdown from '../components/CountryDropdown'
import CustomTouchableOpacity from '../components/btn'
import { useNavigation, useRoute } from '@react-navigation/native'
import symbols from '../constants/symbols'
import { useEffect } from 'react'

const CurrencyConverter = () => {

    const [val1,setVal1] = useState()
    const [val2,setVal2] = useState()
    const [amount ,setAmount] = useState('')
    const {navigate} = useNavigation()
    const {params} = useRoute()
    const {isPinned,amount:pin_amount,val1:pin_val1,val2:pin_val2} = params

    function handleConversion () {
        if(amount && val1 && val2){
            navigate(ROUTES.ConversionResult,{amount,val1,val2})
            return
        }

        alert("All Fields Are Required !")
    }

    useEffect(()=>{
        // console.log("ispinned========",isPinned)
        if(isPinned){
            setVal1(pin_val1)
            setVal2(pin_val2)
            setAmount(pin_amount)
        }
    },[])

    return (
        <KeyboardAvoidingView behavior='height' flex={1} >
            <ScrollView flex={1} bg={colors.BG_COLOR} >
                <VStack flex={1} space={5} px={6} py={10} bg={colors.PRIMARY_COLOR} >
                    <HStack alignItems={'baseline'} space={4} justifyContent={'center'} >
                        <Text color="white" fontSize={28} >Amount :</Text>
                        <TextInput value={amount} onChangeText={(text) => setAmount(text)} style={{ color: 'white', fontSize: 20, fontWeight: 'bold', borderBottomColor: colors.BG_COLOR, borderBottomWidth: 2, minWidth: 50 }} keyboardType='number-pad' cursorColor={colors.BG_COLOR} />
                    </HStack>
                    <HStack flex={1} justifyContent={'center'} space={2} alignItems={"baseline"} >
                        <Text color="white" fontSize={24} >Currency</Text>
                        <CountryDropdown symbols={symbols} bgColor={colors.PRIMARY_COLOR} textColor="white" value={val1} setValue={setVal1} />
                    </HStack>
                </VStack>

                <VStack flex={1} space={5} px={6} pt={10} bg={colors.BG_COLOR} >
                    <HStack justifyContent={'center'} space={4} alignItems={"baseline"} >
                        <Text color="black" fontSize={24} >Convert To</Text>
                        <CountryDropdown symbols={symbols} bgColor={colors.BG_COLOR} textColor="black" value={val2} setValue={setVal2} />
                    </HStack>
                    <Box px={4} w={'1/2'} alignSelf={'flex-end'} mt={12} py={2} bg={colors.PRIMARY_COLOR} rounded={20}>
                        <CustomTouchableOpacity onPress={handleConversion} >
                            <Text fontSize={16} textAlign={'center'} fontWeight={'bold'} color="white" >Get Result</Text>
                        </CustomTouchableOpacity>
                    </Box>
                </VStack>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CurrencyConverter