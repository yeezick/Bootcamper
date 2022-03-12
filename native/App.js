import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Landing } from "./screens/Landing";
import { CreateProject } from "./screens/CreateProject";
import { EditProject } from "./screens/EditProject";
import { SingleProject } from "./screens/SingleProject";
import { Roulette } from "./screens/Roulette";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { UserDashboard } from "./screens/UserDashboard";
import { UserProfile } from "./screens/UserProfile";
import { EditProfile } from "./screens/EditProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="CreateProject"
          component={CreateProject}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="EditProject"
          component={EditProject}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="SingleProject"
          component={SingleProject}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="Roulette"
          component={Roulette}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="UserDashboard"
          component={UserDashboard}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ title: "welcome" }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ title: "welcome" }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
