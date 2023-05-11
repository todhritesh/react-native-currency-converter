import React from 'react'
import { HStack, Text, VStack } from 'native-base'
import colors from '../constants/color'

const ConversionCard = ({item , i}) => {
    return (
        <VStack key={i} space={5} px={6} py={4} bg={colors.PRIMARY_COLOR} >
            <HStack alignSelf={'flex-end'}  space={4} justifyContent={'center'} >
                <Text color="white" fontSize={16} >Date : {item?.date} </Text>
            </HStack>
            <HStack alignItems={'baseline'} space={4} justifyContent={'center'} >
                <Text color="white" fontSize={28} >Rate -</Text>
                <Text color="white" fontSize={28} >{item?.info.rate}</Text>
            </HStack>
            <HStack alignItems={'baseline'} space={4} justifyContent={'center'} >
                <Text color="white" fontSize={28} >{item?.query.from} -</Text>
                <Text color="white" fontSize={28} >{item?.query.amount}</Text>
            </HStack>
            <HStack alignItems={'baseline'} space={4} justifyContent={'center'} >
                <Text color="white" fontSize={16} fontWeight={'bold'} >To</Text>
            </HStack>
            <HStack alignItems={'baseline'} space={4} justifyContent={'center'} >
                <Text color="white" fontSize={28} >{item?.query.to} -</Text>
                <Text color="white" fontSize={28} >{item?.result}</Text>
            </HStack>
        </VStack>
    )
}

export default ConversionCard