import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SingleActionButton } from '../components/Button/SingleActionButton.jsx';

export const Landing = ({ navigation }) => {
  const routeToSignUp = {
    handler() {
      navigation.navigate('SignUp');
    },
    title: 'Sign Up',
  };

  const routeToSignIn = {
    handler() {
      navigation.navigate('SignIn');
    },
    title: 'Sign In',
  };

  const routeToRoulette = {
    handler() {
      navigation.navigate('Roulette');
    },
    title: 'Try it!',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.placeholderImage}></View>
      <Text>Bootcamper</Text>
      <SingleActionButton payload={routeToSignUp} type="long" />
      <SingleActionButton payload={routeToSignIn} style="light" type="long" />
      <Text>Want to take a test drive first?</Text>
      <SingleActionButton payload={routeToRoulette} />
      <Text> Help | Contact</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: 'black',
    height: 200,
    width: '100%',
  },
});
