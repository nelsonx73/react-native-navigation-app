import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import SingUpScreen from "../screens/SingUpScreen";
import SingInScreen from "../screens/SingInScreen";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SingInScreen} />
      <Stack.Screen name="SignUp" component={SingUpScreen} />
    </Stack.Navigator>
  );
}
