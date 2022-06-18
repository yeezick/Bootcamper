import { Text, TouchableHighlight } from 'react-native';
import { getButtonStyles } from './styles';

export const SingleActionButton = (props) => {
  const { handler, title } = props.payload;
  const { style, type } = props;
  const styles = getButtonStyles(style, type);

  // todo: need to consider how to dynamically change button styles if button is pressed
  const touchProps = {
    onPress: handler,
    style: styles.container,
    underlayColor: 'darkgray',
  };

  return (
    <TouchableHighlight {...touchProps} disabled={style === 'disabled' && true}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};
