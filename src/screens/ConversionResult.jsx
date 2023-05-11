import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack , Text, ScrollView, Box, useToast } from 'native-base'
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import colors from '../constants/color';
import CustomSkeletion from '../components/CustomSkeletion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../constants/storage';
import ConversionCard from '../components/ConversionCard';
import {API_KEY} from "@env"
import CustomTouchableOpacity from '../components/btn';



const ConversionResult = () => {
    const {params} = useRoute()
    const {amount,val1,val2} = params
    const [result,setResult] = useState()
    const [loading,setLoaidng] = useState(false)
    const [err,setErr]  = useState()
    const {goBack} = useNavigation()
    const [isPinned , setIsPinned] = useState(false)
    const toast = useToast()

    useEffect(()=>{
        async function getExchange(){
          try{
            setLoaidng(true)
            const response = await axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${val2.label}&from=${val1.label}&amount=${amount}`, {
            headers: {
                'apikey': API_KEY
            }
            });
            setResult(response.data)
            const getLocal = await AsyncStorage.getItem(storage.RESULT_KEY)
            let data = []
            if(getLocal){
              data = JSON.parse(getLocal)
              if(data.length>=5){
                data.pop()
              }
            }
            let newData = [response.data,...data]
            await AsyncStorage.setItem(storage.RESULT_KEY,JSON.stringify(newData))

          }catch(err){
            console.log(err)
            setErr(err)
          } finally{
            setLoaidng(false)
          }
        }
        getExchange()
        console.log("in useEffect")
        console.log( {amount,val1,val2})
    },[amount,val1,val2])

    if(loading) return <CustomSkeletion/>

    if(err) {
      alert("Something went wrong")
      goBack()
    }

    async function handlePin(amount,val1,val2) {
      try{
        const newData = {amount,val1,val2}
        console.log(newData,"===newData====")
        let pins = await AsyncStorage.getItem(storage.PIN)
        let data= []
        if(pins){
          pins = JSON.parse(pins)
          data = [...pins]
        }
        data = [newData,...data]
        await AsyncStorage.setItem(storage.PIN,JSON.stringify(data))
        setIsPinned(true)
        toast.show(
          {title: "Pinned successfully!",
          description: "Requested items were pinned successfully",
          status: "success",
          duration: 3000,
          isClosable: true,}
        )
      }catch(err){
        console.log(err)
        setErr(err)
      }
    }

  return (
    <ScrollView flex={1}>
      <VStack px={4} mt={4}  >
          <ConversionCard item={result} i={1} />
          <Box px={4} w={'1/2'} alignSelf={'flex-end'} mt={4} py={2} bg={colors.PRIMARY_COLOR} rounded={20}>
              <CustomTouchableOpacity disabled={isPinned} onPress={()=>handlePin(amount,val1,val2)} >
                  <Text fontSize={16} textAlign={'center'} fontWeight={'bold'} color="white" >Pin This Search</Text>
              </CustomTouchableOpacity>
          </Box>
      </VStack>
    </ScrollView>
  )
}

export default ConversionResult