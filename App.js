import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Menu from "./Menu";
import { AuthProvider } from "./Hooks/useAuth";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { store,persistor} from "./Store/store";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <NavigationContainer>
              <SafeAreaProvider>
                <AuthProvider>
                  <Menu />
                </AuthProvider>
              </SafeAreaProvider>
            </NavigationContainer>
        {/* </PersistGate> */}
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
