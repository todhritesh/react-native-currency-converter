import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigators/StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./src/constants/color"
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:colors.BG_COLOR}}>
        <StatusBar backgroundColor={colors.PRIMARY_COLOR} />
        <NativeBaseProvider>
          <NavigationContainer>
            <StackNavigator/>
          </NavigationContainer>
        </NativeBaseProvider>
    </SafeAreaView>
  );
}