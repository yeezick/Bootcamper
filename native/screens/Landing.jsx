// import React from "react";
// // import { useNavigate } from "react-router-dom";
import { Button, StyleSheet, Text, View } from "react-native";

export function Landing({ navigation }) {
  // const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <View style={styles.placeholderImage}></View>
      <Text>Bootcamper</Text>
      <Button title={"Sign Up"} onPress={() => navigation.navigate("SignUp")} />
      <Button title={"Sign In"} onPress={() => navigation.navigate("SignIn")} />
      <Text>Want to take a test drive first?</Text>
      <Button
        title={"Try it!"}
        onPress={() => navigation.navigate("Roulette")}
      />
      <Text> Help | Contact</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  placeholderImage: {
    backgroundColor: "black",
    height: "60%",
    width: "100%",
  },
});
