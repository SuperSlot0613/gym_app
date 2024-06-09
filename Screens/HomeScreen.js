import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "react-native";
import axios from "axios";

const HomeScreen = () => {
  const cameraRef = useRef(null);

  const route = useRoute();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [showCamera, setshowCamera] = useState(false);
  const [image, setImage] = useState(null);

  const takePhoto = async () => {
    if (cameraRef) {
      console.log("In take photo");
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspects: [4, 3],
          quality: 1,
          base64: true,
        });
        // if (card) {
        //   dispatch(setDocument(photo.base64));
        // } else {
        //   dispatch(setFaceImage(photo.base64));
        // }
        console.log("The is photo",photo.uri);
        axios({
          url: "http://10.0.2.2:4420/imagecheck",
          method: "GET",
          headers: {
              authorization: "your token comes here",
          },
          data: photo,
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err.message)
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        {showCamera ? (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={Camera.Constants.FlashMode.off}
            ref={cameraRef}
            autoFocus={Camera.Constants.AutoFocus.on}
            // onFacesDetected={card === "true" ? "" : handleFacesDetected}
            // faceDetectorSettings={{
            //   mode: FaceDetector.FaceDetectorMode.fast,
            //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            //   runClassifications: FaceDetector.FaceDetectorClassifications.all,
            //   minDetectionInterval: 100,
            //   tracking: true,
            // }}
          >
            <View style={{flex:1,flexDirection:"column"}}>
              <View style={{alignItems:"center",justifyContent:"center",top:200}}>
                {/* <Image
                  source={require("../assets/workout.gif")}
                  style={{ width: "100%", height: 400,alignContent:"center" }}
                /> */}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  // onPress={() => {
                  //   setType(
                  //     type === Camera.Constants.Type.back
                  //       ? Camera.Constants.Type.front
                  //       : Camera.Constants.Type.back
                  //   );
                  // }}
                >
                  <MaterialIcons
                    name="flip-camera-android"
                    size={44}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    const r = await takePhoto();
                    if (!r.canceled) {
                      setImage(r.uri);
                    }
                    setshowCamera(false);
                  }}
                >
                  <MaterialIcons name="camera" size={44} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => setshowCamera(false)}
                >
                  <MaterialCommunityIcons
                    name="camera-off"
                    size={44}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity
              style={[styles.button]}
              onPress={async () => setshowCamera(true)}
            >
              <MaterialCommunityIcons
                name="camera-off"
                size={44}
                color="black"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    // flexDirection:"column-rev",
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    // alignItems:"center"
    top:300
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
    // paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
    width: 70,
    fontWeight: "bold",
  },
  main_container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  check_button: {
    padding: 10,
    borderColor: "crimson",
    backgroundColor: "crimson",
    width: "80%",
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  main_text: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  RectangleShapeView: {
    marginTop: 50,
    width: "80%",
    height: 120,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  },
  RectangleShapeView: {
    //To make Rectangle Shape
    marginTop: 20,
    width: 120 * 2,
    height: 120,
    backgroundColor: "#14ff5f",
  },
});
