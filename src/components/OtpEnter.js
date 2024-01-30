import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";

const OtpEnter = ({otpvalue,otpenter}) => {
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  // console.log(otpvalue)

  const [text1, settext1] = useState("");
  const [text2, settext2] = useState("");
  const [text3, settext3] = useState("");
  const [text4, settext4] = useState("");
  const [text5, settext5] = useState("");
  const [text6, settext6] = useState("");
  return (
    <View>
      <Text style={styles.title}>Enter OTP</Text>
      <View style={styles.otpView}>
        <TextInput
          ref={ref1}
          style={[
            styles.inputView,
            { borderColor: text1.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text1}
          onChangeText={(txt) => {
            settext1(txt);
            if (txt.length >= 1) {
              ref2.current.focus();
            }
          }}
        />
        <TextInput
          ref={ref2}
          style={[
            styles.inputView,
            { borderColor: text2.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text2}
          onChangeText={(txt) => {
            settext2(txt);
            if (txt.length >= 1) {
              ref3.current.focus();
            } else if (txt.length < 1) {
              ref1.current.focus();
            }
          }}
        />
        <TextInput
          ref={ref3}
          style={[
            styles.inputView,
            { borderColor: text3.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text3}
          onChangeText={(txt) => {
            settext3(txt);
            if (txt.length >= 1) {
              ref4.current.focus();
            } else if (txt.length < 1) {
              ref2.current.focus();
            }
          }}
        />
        <TextInput
          ref={ref4}
          style={[
            styles.inputView,
            { borderColor: text4.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text4}
          onChangeText={(txt) => {
            settext4(txt);
            if (txt.length >= 1) {
              ref5.current.focus();
            } else if (txt.length < 1) {
              ref3.current.focus();
            }
          }}
        />
        <TextInput
          ref={ref5}
          style={[
            styles.inputView,
            { borderColor: text5.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text5}
          onChangeText={(txt) => {
            settext5(txt);
            if (txt.length >= 1) {
              ref6.current.focus();
            } else if (txt.length < 1) {
              ref4.current.focus();
            }
          }}
        />
        <TextInput
          ref={ref6}
          style={[
            styles.inputView,
            { borderColor: text6.length >= 1 ? "crimson" : "white" },
          ]}
          keyboardType="number-pad"
          maxLength={1}
          value={text6}
          onChangeText={(txt) => {
            settext6(txt);
            if (txt.length >= 1) {
              ref6.current.focus();
            } else if (txt.length < 1) {
              ref5.current.focus();
            }
          }}
        />
      </View>
    </View>
  );
};

export default OtpEnter;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    bottom: 50,
  },
  otpView: {
    width: "100%",
    justifyContent: "center",
    alignItem: "center",
    flexDirection: "row",
    bottom: 25,
  },
  inputView: {
    width: Platform.OS == "ios" ? 50 : 40,
    height: 50,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "transparent",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
    textAlign: "center",
  },
});
