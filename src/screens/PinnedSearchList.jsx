import { useNavigation, useRoute } from '@react-navigation/native'
import { HStack, VStack , Text, ScrollView, Box } from 'native-base'
import React, { useState } from 'react'
import { useEffect } from 'react'
import colors from '../constants/color';
import CustomSkeletion from '../components/CustomSkeletion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '../constants/storage';
import CustomTouchableOpacity from '../components/btn';
import ROUTES from '../constants/NavigationRoutes';



const PinnedSearchItem = ({i, item}) => {
    return (
        <VStack rounded={10} key={i} space={2} px={6} py={4} bg={colors.PRIMARY_COLOR} >
            <Text color="white" fontSize={16} >From : {item?.val1.label} </Text>
            <Text color="white" fontSize={16} >To : {item?.val2.label} </Text>
            <Text color="white" fontSize={16} >Amount : {item?.amount} </Text>
        </VStack>
    )
}


const PinnedSearchList = () => {
    const [result,setResult] = useState([])
    const [loading,setLoaidng] = useState(false)
    const [err,setErr]  = useState()
    const {goBack,navigate} = useNavigation()

    console.log(result.length,"=====result========")
    result.forEach(item=>console.log(item))

    async function getExchange(){
      try{
        setLoaidng(true)
        // const getLocal = []
        const getLocal = await AsyncStorage.getItem(storage.PIN)
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
    useEffect(()=>{
        getExchange()
        console.log("in useEffect")
    },[])

    if(loading) return <CustomSkeletion/>

    if(err) {
      alert("Something went wrong")
      goBack()
    }

    function handlePress ({val1,val2,amount}) {
        console.log({val1,val2,amount})
        navigate(ROUTES.CurrencyConverter,{isPinned:true,val1,val2,amount})
    }

    async function handleClearPins(){
        await AsyncStorage.removeItem(storage.PIN)
        getExchange()
        setResult([])
    }

  return (
    <VStack flex={1} space={4} px={4} mt={4} >
        <Box px={4} w={'1/2'} alignSelf={'flex-end'} py={2} bg={'transparent'} borderColor={colors.PRIMARY_COLOR} borderWidth={1} rounded={20}>
            <CustomTouchableOpacity disabled={!result.length} onPress={handleClearPins} >
                <Text fontSize={16} textAlign={'center'} fontWeight={'bold'} color={colors.PRIMARY_COLOR} >Clear All</Text>
            </CustomTouchableOpacity>
        </Box>
        <ScrollView flex={1}  showsVerticalScrollIndicator={false} >
            <VStack flex={1} pb={2} space={5} >
                <>
                {
                  result.length ? 
                    result?.map((item,i)=>(
                        <CustomTouchableOpacity onPress={()=>handlePress(item)}  key={i}>
                            <PinnedSearchItem i={i} item={item} />
                        </CustomTouchableOpacity>
                    ))
                    :
                    <Text textAlign={'center'} fontSize={28} mt={10} fontWeight={'bold'} >No pinned results found !</Text>
                }
                </>
            </VStack>
        </ScrollView>
    </VStack>
  )
}


export default PinnedSearchList