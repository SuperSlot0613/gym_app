import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./Screens/LoginScreen";
import CustomDrawerContent from "./Screens/CustomDrawerContent";
import useAuth from "./Hooks/useAuth";
import OnboardingScreen from "./Screens/OnboardingScreen";
import GenderScreen from "./Screens/GenderScreen";
import ARScreen from "./Screens/ARScreen";

const { width } = Dimensions.get("screen");

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function LoginStack(props) {
  return (
    //   <Provider theme={theme}>
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        drawerContent: false,
        drawer: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="ARScreen" component={ARScreen} />
    </Stack.Navigator>
    //   </Provider>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      mode="card"
      headerMode="screen"
    >
      {/* <Stack.Screen
        name="GenderScreen"
        options={{
          headerShown: false,
        }}
        component={GenderScreen}
      /> */}
    </Stack.Navigator>
  );
}

const Menu = () => {
  const { user, isFirstLaunch } = useAuth();
  console.log(user, isFirstLaunch);
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) =>
        user !== null && <CustomDrawerContent {...props} />
      }
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      screenOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName={
        user === null ? "OnboardingScreen" : "HomeStack"
      }
    >
      {user !== null ? (
        <>
          <Drawer.Screen
            options={{
              headerShown: false,
            }}
            name="HomeStack"
            component={HomeStack}
          />
        </>
      ) : (
        <>
          {!isFirstLaunch ? (
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="LoginPage"
              component={LoginStack}
            />
          ) : (
            <Drawer.Screen
              options={{
                headerShown: false,
              }}
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
          )}
        </>
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

export default Menu;
