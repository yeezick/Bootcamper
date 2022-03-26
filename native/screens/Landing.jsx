import { StyleSheet, Text, View } from 'react-native';
import { SingleActionButton } from '../components/Button/SingleActionButton.jsx';

export const Landing = () => {
  const routeToSignUp = {
    path: 'SignUp',
    text: 'Sign Up',
    type: 'reroute',
  };

  const routeToSignIn = {
    path: 'SignIn',
    text: 'Sign in',
    type: 'reroute',
  };

  const routeToRoulette = {
    path: 'Roulette',
    text: 'Try it!',
    type: 'reroute',
  };

  return (
    <View style={styles.container}>
      <View style={styles.placeholderImage}></View>
      <Text>Bootcamper</Text>
      <SingleActionButton payload={routeToSignUp} />
      <SingleActionButton payload={routeToSignIn} />
      <Text>Want to take a test drive first?</Text>
      <SingleActionButton payload={routeToRoulette} />
      <Text> Help | Contact</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  placeholderImage: {
    backgroundColor: 'black',
    height: '60%',
    width: '100%',
  },
});
