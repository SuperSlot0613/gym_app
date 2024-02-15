import { View, Text } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaProvider style={{backgroundColor:"#171616"}}>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;
