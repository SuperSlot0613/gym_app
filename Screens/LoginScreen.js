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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import OtpEnter from "../src/components/OtpEnter";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAuth from "../Hooks/useAuth";
import { useDispatch } from "react-redux";
import { ADD_TO_USERDATA } from "../feature/navSlice";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { signWithEmailId, registerWithEmailId } = useAuth();
  const [number, setnumber] = useState("");
  const [disable, setdisable] = useState(false);
  const [numberVerification, setnumberVerification] = useState({
    confirmResult: null,
    verificationCode: "123456",
  });
  const [count, setcount] = useState(60);
  const [userId, setuserId] = useState();
  const { setuser } = useAuth();
  const [enablemail, setenablemail] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const dispatch = useDispatch();

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
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "SUCCESS",
        textBody: "OTP Sent Your Mobile Number",
        button: "close",
      });
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
    if (numberVerification.verificationCode == 6) {
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
      if (numberVerification.verificationCode === codenum) {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Number Verification Done",
          button: "close",
        });
        dispatch(ADD_TO_USERDATA(number));
        navigation.navigate("GenderScreen");
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "WARNING",
          textBody: "Enter OTP is Invailed",
          button: "close",
        });
      }
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "WARNING",
        textBody: "Number Verification Done",
        button: "close",
      });
      Alert.alert("Please enter a 6 digit OTP code.");
    }
  };

  return (
    <AlertNotificationRoot>
      <Background>
        {/* <BackButton goBack={navigation.goBack()}/> */}
        <View style={styles.blurImageStyle}>
          {enablemail ? (
            <View style={styles.textInput}>
              <KeyboardAvoidingView>
                <TextInput
                  style={[styles.input, { bottom: 40 }]}
                  placeholder="Enter Your Name"
                  mode="outlined"
                  keyboardType="default"
                  placeholderTextColor={"white"}
                  value={name}
                  onChangeText={(text) => setname(text)}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <TextInput
                  style={[styles.input, { bottom: 20 }]}
                  placeholder="Enter Your Email"
                  mode="outlined"
                  keyboardType="email-address"
                  placeholderTextColor={"white"}
                  value={email}
                  onChangeText={(text) => setemail(text)}
                />
              </KeyboardAvoidingView>
              <KeyboardAvoidingView>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Enter Your Password"
                  mode="outlined"
                  keyboardType="default"
                  placeholderTextColor={"white"}
                  value={password}
                  onChangeText={(text) => setpassword(text)}
                />
                {/* <MaterialCommunityIcons
                  name={"eye"}
                  size={24}
                  color="#aaa"
                  style={styles.icon}
                  // onPress={toggleShowPassword}
                /> */}
              </KeyboardAvoidingView>
              {/* <TouchableOpacity> */}
              <Button
                onPress={() => {
                  if (name == "") {
                    Dialog.show({
                      type: ALERT_TYPE.WARNING,
                      title: "WARNING",
                      textBody: "Please Enter Name",
                      button: "close",
                    });
                  } else if (email == "") {
                    Dialog.show({
                      type: ALERT_TYPE.WARNING,
                      title: "WARNING",
                      textBody: "Please Enter Email",
                      button: "close",
                    });
                  } else if (password == "") {
                    Dialog.show({
                      type: ALERT_TYPE.WARNING,
                      title: "WARNING",
                      textBody: "Please Enter Password",
                      button: "close",
                    });
                  } else {
                    registerWithEmailId({ name, email, password });
                  }
                }}
                mode="contained"
              >
                CONTINUE
              </Button>
              {/* </TouchableOpacity> */}
            </View>
          ) : (
            <View style={styles.textInput}>
              {disable === true ? (
                <>
                  <OtpEnter
                    otpvalue={numberVerification}
                    otpenter={setnumberVerification}
                  />
                  <View style={styles.resendView}>
                    <TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
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
                          fontWeight: "bold",
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
              <TouchableOpacity
                onPress={() => {
                  if (disable === false) {
                    if (number != "") {
                      checkNumber();
                    } else {
                      Dialog.show({
                        type: ALERT_TYPE.WARNING,
                        title: "WARNING",
                        textBody: "Please Enter Number",
                        button: "close",
                      });
                    }
                  } else {
                    handleVerifyCode();
                  }
                }}
              >
                <Button mode="contained">CONTINUE</Button>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.bottomView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 0,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                OR SIGN WITH
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (enablemail) {
                    setenablemail(false);
                  } else {
                    setenablemail(true);
                  }
                }}
              >
                <Text
                  style={{
                    color: "crimson",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  {enablemail ? "Sign with Number" : "Sign with Email"}
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 8,
                fontWeight: "bold",
                color: "white",
                top: 10,
              }}
            >
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
    bottom: 100,
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
    color:'white'
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
    top: 60,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginLeft: 10,
  },
});
