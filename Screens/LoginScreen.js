import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Background from "../src/components/Background";
import BackButton from "../src/components/BackButton";
import Button from "../src/components/Button";
import {
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import OtpEnter from "../src/components/OtpEnter";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../Hooks/useAuth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [number, setnumber] = useState("");
  const [disable, setdisable] = useState(false);
  const [numberVerification, setnumberVerification] = useState({
    confirmResult: null,
    verificationCode: "",
  });
  const [count, setcount] = useState(60);
  const [userId, setuserId] = useState();
  const { setuser } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (count == 0) {
        clearInterval(interval);
      } else {
        setcount(count - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  const validatePhoneNumber = () => {
    var regexp = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return regexp.test(number);
  };

  const checkNumber = () => {
    if (validatePhoneNumber) {
      setdisable(true);
      console.log(disable);
      // handleSendCode();
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Invailed Number",
        button: "close",
      });
    }
  };
  const handleSendCode = () => {
    // Request to send OTP
    console.log("Function enter");
    // const phonenumber="+919082502271"
    // window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container');
    // const appVerifier=window.recaptchaVerifier

    signInWithPhoneNumber(auth, number)
      .then((confirmResult) => {
        setnumberVerification({
          confirmResult: confirmResult,
          verificationCode: "",
        });
        console.log(confirmResult);
      })
      .catch((error) => {
        Alert.alert(error.message);
        console.log(error);
      });
  };

  const handleVerifyCode = () => {
    // Request for OTP verification
    const codenum = "123456";
    if (codenum.length == 6) {
      // numberVerification.confirmResult
      //   .confirm(numberVerification.verificationCode)
      //   .then((user) => {
      //     console.log(user);
      //     setuserId(user.uid);
      //     Alert.alert(`Verified! ${user.uid}`);
      //   })
      //   .catch((error) => {
      //     Alert.alert(error.message);
      //     console.log(error);
      //   });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Success",
        textBody: "Number Verification Done",
        button: "close",
      });
      setuser(number);
      navigation.navigate("HomeStack");
    } else {
      Alert.alert("Please enter a 6 digit OTP code.");
    }
  };

  return (
    <AlertNotificationRoot>
      <Background>
        {/* <BackButton goBack={navigation.goBack()}/> */}
        <View style={styles.blurImageStyle}>
          <View style={styles.textInput}>
            {disable === true ? (
              <>
                <OtpEnter />
                <View style={styles.resendView}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        bottom: 8,
                        color: count !== 60 ? "crimson" : "white",
                      }}
                      onPress={() => setcount(60)}
                    >
                      Resend OTP
                    </Text>
                  </TouchableOpacity>
                  {count !== 0 && (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "crimson",
                        marginLeft: 10,
                        bottom: 8,
                      }}
                    >
                      {count + " Seconds"}
                    </Text>
                  )}
                </View>
              </>
            ) : (
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Your Number"
                  mode="outlined"
                  keyboardType="numeric"
                  placeholderTextColor={"white"}
                  value={number}
                  onChangeText={(text) => setnumber(text)}
                />
              </KeyboardAvoidingView>
            )}
            <Button
              onPress={() => {
                if (disable === false) {
                  checkNumber();
                } else {
                  handleVerifyCode();
                }
              }}
              mode="contained"
            >
              CONTINUE
            </Button>
          </View>
          <View style={styles.bottomView}>
            <View>
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                OR CONNECT WITH
              </Text>
            </View>
            <Text style={{fontSize:8,fontWeight:"bold",color:"white",top:10}}>
              By continuing you agree to the Terms of Services and Privacy
              Policy
            </Text>
          </View>
        </View>
      </Background>
    </AlertNotificationRoot>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  blurImageStyle: {
    flex: 1,
    height: "50%",
    width: "100%",
    position: "absolute",
    bottom: 150,
    justifyContent: "flex-end",
    backfaceVisibility: "visible",
  },
  textInput: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "transparent",
    color: "white",
    height: 45,
    borderRadius: 8,
    paddingLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
  resendView: {
    flexDirection: "row",
    alignSelf: "center",
    color: "white",
    justifyContent: "space-between",
  },
  bottomView: {
    top:70,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width:"100%"
  },
});
