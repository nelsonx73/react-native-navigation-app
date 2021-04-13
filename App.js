import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect, useMemo, useReducer } from "react";
import { View, ActivityIndicator, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SupportScreen from "./screens/SupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BookmarksScreen from "./screens/BookmarksScreen";

import MainTab from "./navigation/MainTab";
import MainDrawer from "./navigation/MainDrawer";
import MainStack from "./navigation/MainStack";
import { AuthContext } from "./context/Context";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const initialState = {
  isLoading: true,
  userName: null,
  userToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "RETREIVE_TOKEN":
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case "LOGIN":
      return {
        ...state,
        userName: action.payload.id,
        userToken: action.payload.token,
        isLoading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case "REGISTER":
      return {
        ...state,
        userName: action.payload.id,
        userToken: action.payload.token,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authContext = useMemo(
    () => ({
      SignIn: async (userName, password) => {
        if (userName === "user" && password === "pass") {
          const token = "12345";
          try {
            await AsyncStorage.setItem("userToken", token);
          } catch (error) {
            console.log(error);
          }
          dispatch({ type: "LOGIN", payload: { id: userName, token } });
        }
      },
      SignOut: async () => {
        await AsyncStorage.removeItem("userToken");
        dispatch({ type: "LOGOUT" });
        // setUserToken(null);
        // setIsloading(false);
      },
      SignUp: () => {
        // dispatch({type: "LOG"})
        // setUserToken("123");
        // setIsloading(false);
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log(error);
      }
      dispatch({
        type: "REGISTER",
        payload: { id: null, token },
      });
    }, 1000);
  }, []);

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#333" animating={true} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken === null ? (
          <MainStack />
        ) : (
          <Drawer.Navigator
            drawerContent={(props) => <MainDrawer {...props} />}
          >
            <Drawer.Screen name="MainDrawer" component={MainTab} />
            <Drawer.Screen name="Support" component={SupportScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
