import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";

import { AuthContext, UserContext } from "../context/Context";

import Users from "../data/DummyData";

export default function SignInScreen({ navigation }) {
  const [data, setData] = useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    validPassword: true,
    validUsername: true,
  });

  const { SignIn } = useContext(AuthContext);

  const usernameInputChange = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        username: value,
        check_textInputChange: true,
        validUsername: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        check_textInputChange: false,
        validUsername: false,
      });
    }
  };

  const passwordInputChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        validPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        validPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (value) => {
    if (value.trim().length >= 4) {
      setData({
        ...data,
        validUsername: true,
      });
    } else {
      setData({
        ...data,
        validUsername: false,
      });
    }
  };

  const handleSingIn = () => {
    if (data.username.length === 0 && data.password.length === 0) {
      Alert.alert(
        "Wrong Input!",
        "Username or password field cannot be empty.",
        [{ text: "Ok" }]
      );
      return;
    }

    const user = Users.filter(
      (element) =>
        element.username === data.username && element.password === data.password
    );

    if (user.length === 0) {
      Alert.alert("Invalid User!", "Username or password is incorrect", [
        { text: "Ok" },
      ]);
      return;
    }
    SignIn(user[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="Your username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => usernameInputChange(value)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange && (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          )}
        </View>
        {!data.validUsername && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Username must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text style={{ marginTop: 35, ...styles.text_footer }}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            secureTextEntry={data.secureTextEntry ? true : false}
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => passwordInputChange(value)}
          />
          <TouchableOpacity onPress={() => updateSecureTextEntry()}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="green" size={20} />
            ) : (
              <Feather name="eye" color="green" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {!data.validPassword && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        <TouchableOpacity>
          <Text style={{ color: "#009387", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        <View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={handleSingIn}>
              <LinearGradient
                colors={["#08d4c4", "#01ab9d"]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={{
              ...styles.signIn,
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            }}
          >
            <Text style={{ ...styles.textSign, color: "#009387" }}>
              Sing Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
