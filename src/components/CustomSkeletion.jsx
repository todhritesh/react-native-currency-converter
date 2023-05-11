import { View, Text } from 'react-native'
import React from 'react'
import { Skeleton, VStack } from 'native-base'

const CustomSkeletion = () => {
  return (
    <VStack px={4} mt={4}  >
        <Skeleton w='full'startColor="gray.200" endColor="gray.300"  h={300} />
    </VStack>
  )
}

export default CustomSkeletion