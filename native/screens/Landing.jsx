import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.placeholderImage}></View>
        <Text>Bootcamper</Text>
        <SingleActionButton payload={routeToSignUp} />
        <SingleActionButton payload={routeToSignIn} light />
        <Text>Want to take a test drive first?</Text>
        <SingleActionButton payload={routeToRoulette} disabled />
        <SingleActionButton payload={routeToRoulette} long />
        <SingleActionButton payload={routeToRoulette} long light />
        <Text> Help | Contact</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    // flex: 1,
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: 'black',
    height: '60%',
    width: '100%',
  },
});
