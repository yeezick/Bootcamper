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

export const SingleActionButton = (props) => {
  const { title, handler } = props.payload;
  const buttonStyles = [styles.button];
  const textStyles = [];

  if (props.long) {
    buttonStyles.push(styles.long);
  }

  if (props.light) {
    buttonStyles.push(styles.light);
    textStyles.push(text.light);
  } else if (props.disabled) {
    buttonStyles.push(styles.disabled);
    textStyles.push(text.disabled);
  } else {
    buttonStyles.push(styles.default);
    textStyles.push(text.default);
  }

  return (
    <Pressable style={buttonStyles} onPress={handler}>
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
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
    width: 102,
  },
  default: {
    backgroundColor: '#000',
  },
  disabled: {
    backgroundColor: '#EBEBE4',
  },
  light: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
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
