import { Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SingleActionButton = ({ payload }) => {
  const { path, text, type } = payload;
  const navigation = useNavigation();

  const reroute = () => {
    navigation.navigate(path);
  };

  const callApi = (apiUrl) => {
    // calls an API
    // consider when the request may have a body
  };

  const apiReroute = (apiUrl, path) => {
    // calls an API
    // consider when the request may have a body
    // then reroutes
  };

  switch (type) {
    case 'reroute':
      return (
        <Pressable style={[styles.button, styles.default]} onPress={reroute}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      );

    case 'call-api':
      return (
        <Pressable style={[styles.button, styles.default]} onPress={callApi}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      );

    case 'api-reroute':
      return (
        <Pressable style={[styles.button, styles.default]} onPress={apiReroute}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      );

    default:
      return (
        <Pressable style={[styles.button, styles.error]} onPress={reroute}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      );
  }
};

// basic styling just for show
// ideally, the styling does not live in this file
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    height: 30,
    justifyContent: 'center',
    marginBottom: 10,
    width: 200,
  },
  default: {
    backgroundColor: '#000',
  },
  error: {
    backgroundColor: 'red',
  },
  text: {
    color: '#fff',
    margin: 'auto',
  },
});
