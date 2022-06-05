import { Pressable, StyleSheet, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * needs to handle following styles as props:
 * - disabled: grayed out styling, light gray test (invisible) and actually disables
 * - whiteout: white background, dark text, black border
 * - darkMode: black background, light text
 *
 * can be used in conjuction with types:
 * - short: 1/4 of screen width
 * - long: 1/2 width
 */
// todo: remove switch case and have onPress functions defined in executor component

export const SingleActionButton = ({ payload }, ...propStyles) => {
  const { text, type } = payload;
  const navigation = useNavigation();

  const reroute = () => {
    const { path } = payload;
    navigation.navigate(path);
  };

  const callApi = () => {
    const { handler } = payload;
    handler();
    // calls an API
    // consider when the request may have a body
  };

  const apiReroute = (apiUrl, path) => {
    const { handler } = payload;
    handler();
    // calls an API
    // consider when the request may have a body
    // then reroutes
  };

  const triggerAlert = () => {
    const { title, message, options } = payload;
    Alert.alert(title, message, options);
  };

  switch (type) {
    case 'reroute':
      return (
        <Pressable style={[styles.button, styles.default]} onPress={reroute}>
          <Text style={styles.text}>{text}</Text>
        </Pressable>
      );

    case 'api':
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

    case 'trigger-alert':
      return (
        <Pressable style={[styles.button, styles.default]} onPress={triggerAlert}>
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

// ideally, the styling does not live in this file
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    marginBottom: 10,
    // width: 200,
  },
  default: {
    backgroundColor: '#000',
    width: 102,
  },
  disabled: {
    backgroundColor: '#EBEBE4',
  },
  long: {
    width: 250,
  },
});

const text = StyleSheet.create({
  default: {
    color: '#fff',
  },
  disabled: {
    color: '#a9a9a9',
  },
  light: {
    color: '#000',
  },
});
