import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "../src/core/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../src/components/Button";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_USERDATA, selectUserdata } from "../feature/navSlice";
import useAuth from "../Hooks/useAuth";

const HeightScreen = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [height, setheight] = useState("");
  const navigation = useNavigation();
  const route=useRoute()
  const {setuser}=useAuth()
  const dispatch=useDispatch()
  console.log(route.params)

  return (
    <AlertNotificationRoot>
      <ImageBackground
        source={require("../assets/blurback.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={{ bottom: 20 }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: 700 }}>
              What is Your Height ?
            </Text>
          </View>
          <KeyboardAvoidingView>
            <View style={{flexDirection:'column'}}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Height in CM"
                mode="outlined"
                keyboardType="numeric"
                placeholderTextColor={"white"}
                value={height}
                onChangeText={(text) => setheight(text)}
              />
              <Image
                style={[styles.ImageChange,{height:400}]}
                source={require("../assets/height_pick1.png")}
              />
            </View>
          </KeyboardAvoidingView>
          <View style={{ top: 50, width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                if (height=="") {
                  Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "WARNING",
                    textBody: "Please Enter Your Height",
                    button: "close",
                  });
                } else {
                  const data={
                    number:route.params.number,
                    gender:route.params.gender,
                    height:height
                  }
                  setuser(data)
                  dispatch(ADD_TO_USERDATA({
                    data
                  }))
                  navigation.navigate("HomeScreen");
                  
                }
              }}
            >
              <Button mode="contained">CONTINUE</Button>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </AlertNotificationRoot>
  );
};

export default HeightScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    position: "relative",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    height: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
    color: "white",
    height: 50,
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
    width: 300,
  },
  ImageChange: {
    top: 10,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius:400
  },
});
