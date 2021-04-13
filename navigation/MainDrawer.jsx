import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";

import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthContext } from "../context/Context";

export default function MainDrawer({ navigation }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { SignOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <Avatar.Image source={{}} size={50} />
            <View style={{ marginLeft: 10 }}>
              <Title style={styles.title}>Nelson M</Title>
              <Caption style={styles.caption}>Application Developer</Caption>
            </View>
          </View>

          <View style={{ ...styles.row, marginLeft: 20 }}>
            <View style={styles.section}>
              <Paragraph style={{ ...styles.paragraph, ...styles.caption }}>
                80
              </Paragraph>
              <Caption style={{ ...styles.caption }}>following</Caption>
            </View>

            <View style={styles.section}>
              <Paragraph style={{ ...styles.paragraph, ...styles.caption }}>
                100
              </Paragraph>
              <Caption style={{ ...styles.caption }}>followers</Caption>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Ionicons name="home-outline" size={26} />}
              label="Home"
              onPress={() => {
                navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={() => <Ionicons name="person-outline" size={26} />}
              label="Profile"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />

            <DrawerItem
              icon={() => <Ionicons name="bookmark-outline" size={26} />}
              label="Bookmarks"
              onPress={() => {
                navigation.navigate("Bookmarks");
              }}
            />

            <DrawerItem
              icon={() => <Ionicons name="settings-outline" size={26} />}
              label="Settings"
              onPress={() => {
                navigation.navigate("Settings");
              }}
            />

            <DrawerItem
              icon={() => (
                <MaterialCommunityIcons
                  name="account-check-outline"
                  size={26}
                />
              )}
              label="Support"
              onPress={() => {
                navigation.navigate("Support");
              }}
            />
          </Drawer.Section>

          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => setIsDarkTheme(!isDarkTheme)}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Ionicons name="exit-outline" size={26} />}
          label="Sign out"
          onPress={() => SignOut()}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
