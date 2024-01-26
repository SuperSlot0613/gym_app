import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import useAuth from "../Hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';

const OnboardingScreen = () => {
  const { user, isFirstLaunch, setIsFirstLaunch } = useAuth();
  const navigation = useNavigation();

  return (
    <Onboarding
      // SkipButtonComponent={Skip}
      // NextButtonComponent={Next}
      onSkip={() => {
        setIsFirstLaunch(false);
        // AsyncStorage.setItem("alreadyLaunched", "true");
        // navigation.navigate("OptionLogin");
      }}
      onDone={() => {
        setIsFirstLaunch(false);
        console.log("onbordingScreen", isFirstLaunch);
        // AsyncStorage.setItem("alreadyLaunched", "true");
        // navigation.navigate("OptionLogin");
      }}
      pages={[
        {
          backgroundColor: "black",
          image: (
            <Image
              style={{ width: "100%", height:"100%", borderRadius: 10 }}
              source={require("../assets/board1.jpeg")}
            />
          ),
        },
        {
          backgroundColor: "black",
          image: (
            <Image
            style={{ width: "100%", height:"100%", borderRadius: 10 }}
              source={require("../assets/board2.jpeg")}
            />
          ),
        },
        {
          backgroundColor: "black",
          image: (
            <Image
            style={{ width: "100%", height:"100%", borderRadius: 10 }}
              source={require("../assets/board3.jpeg")}
            />
          ),
        },
        {
          backgroundColor: "black",
          image: (
            <Image
            style={{ width: "100%", height:"100%", borderRadius: 10 }}
              source={require("../assets/boards4.jpeg")}
            />
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({});
