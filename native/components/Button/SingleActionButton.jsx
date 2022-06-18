import { Pressable, Text } from 'react-native';
import { getButtonStyles } from './styles';

export const SingleActionButton = (props) => {
  const { handler, title } = props.payload;
  const { style, type } = props;
  const styles = getButtonStyles(style, type);

  return (
    <Pressable style={styles.container} onPress={handler}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};
