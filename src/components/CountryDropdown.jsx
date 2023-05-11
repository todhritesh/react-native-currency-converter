import { useEffect, useState } from 'react';
import colors from '../constants/color';
import { Entypo } from '@expo/vector-icons';
import { Box, Divider, HStack, Text, VStack } from 'native-base';
import CustomTouchableOpacity from './btn';
import { FlashList } from "@shopify/flash-list";
import { Modal, TextInput, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function CountryDropdown({value, setValue,bgColor,textColor , symbols}) {
  const [open, setOpen] = useState(false);
  const [searchText , setSearchText] = useState("")
  const [searchResult , setSearchResult] = useState([])
  const [items, setItems] = useState([]);
  const {width,height} = useWindowDimensions()

  useEffect(()=>{
    const data = Object.keys(symbols.symbols).map((item,i)=>({id:i+1,label:item,value:item}))
    setItems(data)
  },[])

  const handleItemClick = (item,index)=>{
    setValue(item)
    setOpen(false)
  }

  const RenderItem = ({item,index}) => {
    return (
      <CustomTouchableOpacity onPress={()=>handleItemClick(item,index)} key={{index}} >
        <Text bg={value?.id === item.id ? 'gray.300' : 'white'} color={colors.PRIMARY_COLOR} fontSize={16} px={3} py={1} >{item?.label}</Text>
        <Divider color={'gray.300'} />
      </CustomTouchableOpacity>
    )
  }

  function handleChange(text){
    console.log(text)
    setSearchText(text)
  }

  useEffect(()=>{
    setSearchResult(items.filter(item=>item.label.toLowerCase().includes(searchText.toLowerCase())))
  },[searchText])

  return (

    <VStack position={'relative'} w={"50%"} >
      <VStack flex={1} w="full" space={2} >
        <CustomTouchableOpacity onPress={()=>setOpen(prev=>!prev)}>
          <HStack justifyContent={'space-between'} alignItems={'center'} borderWidth={1} borderColor={textColor} borderRadius={10} px={2} py={1}>
            <Text fontSize={20}  color={textColor} > {value ? value.label : "Select"} </Text>
            <AntDesign name="caretdown" size={20} color={textColor} />
          </HStack>
        </CustomTouchableOpacity>
            <Modal style={{width,height}} visible={open} onRequestClose={()=>setOpen(false)} animationType='slide' >
              <Box flex={1} p={4} pb={.5} borderWidth={1} borderColor={textColor} >
                <CustomTouchableOpacity onPress={()=>setOpen(false)} >
                <Entypo name="cross" size={28} style={{alignSelf:'flex-end'}} color={colors.PRIMARY_COLOR} />
                </CustomTouchableOpacity>
                <TextInput placeholder='Search ...' value={searchText} onChangeText={handleChange} style={{marginBottom:4,borderColor:colors.PRIMARY_COLOR,width:"100%",borderWidth:1,paddingHorizontal:4,borderColor:colors.PRIMARY_COLOR,alignSelf:'center',color:colors.PRIMARY_COLOR,marginHorizontal:5}} />
                {!searchResult.length && searchText ? 
                <Text textAlign={'center'} fontSize={20} mt={10} fontWeight={'bold'} >No search results !</Text>  :
                <FlashList
                  data={ searchResult.length ? searchResult : items }
                  renderItem={({item,index})=><RenderItem item={item} index={index} />}
                  estimatedItemSize={100}
                />
              }
              </Box>
            </Modal>
      </VStack>
    </VStack>

  );
}