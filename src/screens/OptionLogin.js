import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { useNavigation } from "@react-navigation/native";

const OptionLogin = () => {
  const navigation = useNavigation();
  return (
    <Background>
      <Logo />
      <Header>MediSale</Header>
      <Paragraph>The easiest way to Buy Medicine.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("StartScreen")}
      >
        Login As Customer
      </Button>
      {/* <Text>or</Text> */}
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("StartScreen2", {
            seller: "true",
          })
        }
      >
        Login As Seller
      </Button>
      {/* <Text>or</Text> */}
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("DeliveryBoyPage", {
            seller: "true",
          })
        }
      >
        Join As Delivery
      </Button>
    </Background>
  );
};

export default OptionLogin;

const styles = StyleSheet.create({});
