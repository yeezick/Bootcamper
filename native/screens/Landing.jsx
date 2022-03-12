// import React from "react";
// // import { useNavigate } from "react-router-dom";
import { StyleSheet, Text, View } from "react-native";

export function Landing() {
  // const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <Text>Bootcamper</Text>
      {/* button */}
      {/* button */}
      <Text>Want to take a test drive first?</Text>
      {/* button */}
      <Text> Help | Contact</Text>
      {/* <StatusBar style="auto" /> */}
    </View>
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
