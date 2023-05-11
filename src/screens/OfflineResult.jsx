import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack , Text, ScrollView } from 'native-base'
import React, { useState } from 'react'
import { useEffect } from 'react'
import colors from '../constants/color';
import CustomSkeletion from '../components/CustomSkeletion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../constants/storage';
import ConversionCard from '../components/ConversionCard';



const OfflineResult = () => {
    const [result,setResult] = useState([])
    const [loading,setLoaidng] = useState(false)
    const [err,setErr]  = useState()
    const {goBack} = useNavigation()

    console.log(result.length,"=====result========")
    result.forEach(item=>console.log(item))

    useEffect(()=>{
        async function getExchange(){
          try{
            setLoaidng(true)
            // const getLocal = []
            const getLocal = await AsyncStorage.getItem(storage.RESULT_KEY)
            let data = []
            if(getLocal){
                data = JSON.parse(getLocal)
                console.log(data,"====in getLocal=====")
              setResult(data)
            }
          }catch(err){
            console.log(err)
            setErr(err)
          } finally{
            setLoaidng(false)
          }
        }
        getExchange()
        console.log("in useEffect")
    },[])

    if(loading) return <CustomSkeletion/>

    if(err) {
      alert("Something went wrong")
      // goBack()
    }

  return (
    <VStack flex={1} px={4} mt={4} >
        <ScrollView flex={1}  showsVerticalScrollIndicator={false} >
            <VStack flex={1} pb={2} space={5} >
                <>
                {
                  result.length ? 
                    result?.map((item,i)=>(
                        <ConversionCard key={i} i={i} item={item} />
                    ))
                    :
                    <Text textAlign={'center'} fontSize={28} mt={10} fontWeight={'bold'} >No offline results !</Text>
                }
                </>
            </VStack>
        </ScrollView>
    </VStack>
  )
}

export default OfflineResult