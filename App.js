import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import SupportScreen from "./screens/SupportScreen";
import SettingsScreen from "./screens/SettingsScreen";
import BookmarksScreen from "./screens/BookmarksScreen";

import MainTab from "./navigation/MainTab";
import MainDrawer from "./navigation/MainDrawer";
import MainStack from "./navigation/MainStack";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack />

      {/* <Drawer.Navigator drawerContent={(props) => <MainDrawer {...props} />}>
        <Drawer.Screen name="MainDrawer" component={MainTab} />
        <Drawer.Screen name="Support" component={SupportScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}
