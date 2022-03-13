import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getAllProjects } from '../services/api/projects';
import { Provider, useSelector } from 'react-redux';

export function Landing({ navigation }) {
  const state = useSelector((state) => state);
  // console.log('state', state)
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
