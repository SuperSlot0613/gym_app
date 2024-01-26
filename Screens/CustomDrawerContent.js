import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

// import Images from "../assets/logo.png";
import DrawerItem from "../Component/DrawerItem";
import { Avatar } from "react-native-elements";
import useAuth from "../Hooks/useAuth";
// import {
//   uniqueNamesGenerator,
//   adjectives,
//   colors,
//   animals,
// } from "unique-names-generator";
// import { nanoid } from 'nanoid'
import { db, storage, firebase } from "../firebase";
import uuid from 'uuid';
import {
  setDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "@firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { random } from "nanoid";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const { user } = useAuth();
  const [image, setImage] = useState();
  // console.log(image)
  // user.photoURL
  const screens = [
    "Home",
    "Your Account",
    // "Recommended",
    "Your Orders",
    "Your Wish List",
    "Buy Again",
    "Chat",
    "Log Out",
  ];

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
        console.log("failed")
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const ref = firebase.storage().ref().child(`Pictures/${uuid.v4()}`);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        // setUploading(true);
      },
      (error) => {
        // setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          // setUploading(false);
          console.log("Download URL: ", url);
          // setImage(url);
          const imageupdate = doc(db, "userInfo", user.email);
          updateDoc(imageupdate, {
            photourl: url,
          });
          blob.close();
          return url;
        });
      }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 6],
      quality: 1,
      base64: true,
      mediaType: "photo",
      storageOptions: {
        cameraRoll: false,
        skipBackup: true,
        path: "tmp_files",
      },
    });
    // console.log("This is image", result.assets[0].base64);
    if (!result.canceled) {
      setImage(result.uri);
      // console.log(image)
      uploadImage(result.uri);
      // console.log(imageupdate)
    }
  };

  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.11} style={styles.header}>
        {/* <Image style={styles.logo} source={Images} /> */}
        {image === "" ? (
          <TouchableOpacity onPress={pickImage}>
            <Avatar
              rounded
              icon={{ name: "adduser", type: "antdesign" }}
              size="large"
              activeOpacity={0.7}
              containerStyle={{
                position: "relative",
                zIndex: 10,
                backgroundColor: "gray",
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Avatar
              rounded
              source={{
                uri: image,
              }}
              size="large"
              activeOpacity={0.7}
              containerStyle={{ position: "relative", zIndex: 10 }}
            />
          </TouchableOpacity>
        )}
        <View style={styles.nameView}>
          <Text color="#AC2688" style={{ fontSize: 20 }}>
            Saurabh
          </Text>
          <Text color="#5E72E4" style={{ fontSize: 14 }}>
            saurabh.yadav@gmail.com
          </Text>
        </View>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block
            flex
            style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}
          >
            <Block
              style={{
                borderColor: "rgba(0,0,0,0.2)",
                width: "100%",
                borderWidth: StyleSheet.hairlineWidth,
              }}
            />
            {/* <Text color="#8898AA" style={{ marginTop: 16, marginLeft: 8 }}>
              DOCUMENTATION
            </Text> */}
          </Block>
          {/* <DrawerCustomItem title="Getting Started" navigation={navigation} /> */}
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingBottom: theme.SIZES.BASE * 2,
    paddingTop: theme.SIZES.BASE * 2.8,
    // justifyContent: "space-evenly",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    marginBottom: 10,
    borderColor: "#CAD1D7",
  },
  nameView: {
    marginTop: 10,
    marginLeft: 10,
    width: 170,
  },
  logo: {
    width: "100%",
    flexWrap: "wrap",
    resizeMode: "center",
  },
});

export default CustomDrawerContent;
