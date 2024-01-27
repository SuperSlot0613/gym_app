import React from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { theme } from "../core/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Background({ children }) {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;
  return (
    <ImageBackground
      source={require("../assets/bg2.jpg")}
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
        {children}
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    position: "relative"
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    height: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
