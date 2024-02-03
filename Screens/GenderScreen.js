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
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  const [male, setmale] = useState(false);
  const [female, setfemale] = useState(false);
  const navigation = useNavigation();

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
          <View style={{ bottom: 150 }}>
            <Text style={{ fontSize: 25, color: "white", fontWeight: 700 }}>
              What is Your Gender ?
            </Text>
          </View>
          <View style={styles.ImageDisplay}>
            <View
              style={[
                styles.Imagemain,
                { borderColor: male ? "crimson" : "white" },
              ]}
              onStartShouldSetResponder={() => {
                if (female) {
                  setfemale(false);
                }
                setmale(true);
              }}
            >
              <Image
                style={styles.ImageChange}
                source={require("../assets/man_body.png")}
              />
              <Text
                style={{
                  bottom: 20,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Male
              </Text>
            </View>
            <View
              style={[
                styles.Imagemain,
                { borderColor: female ? "crimson" : "white" },
              ]}
              onStartShouldSetResponder={() => {
                if (male) {
                  setmale(false);
                }
                setfemale(true);
              }}
            >
              <Image
                style={[styles.ImageChange, { height: "90%", top: 0 }]}
                source={require("../assets/female_body.png")}
              />
              <Text
                style={{
                  bottom: 8,
                  fontSize: 20,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Female
              </Text>
            </View>
          </View>
          <View style={{ top: 225, width: "100%" }}>
            <TouchableOpacity
              onPress={() => {
                if (male == false && female == false) {
                  Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: "WARNING",
                    textBody: "Please Select Gender",
                    button: "close",
                  });
                } else {
                  navigation.navigate("ARScreen");
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

export default HomeScreen;

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
  ImageDisplay: {
    flex: 1,
    height: "50%",
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backfaceVisibility: "visible",
    alignItems: "center",
    bottom: 200,
  },
  Imagemain: {
    width: "50%",
    height: "70%",
    borderColor: "white",
    margin: 50,
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageChange: {
    top: 10,
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
  },
});
