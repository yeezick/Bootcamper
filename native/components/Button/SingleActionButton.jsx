import { useState } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { getButtonStyles } from './styles';

export const SingleActionButton = (props) => {
  const [pressed, togglePressed] = useState(false);
  const { handler, title } = props.payload;
  const { style, type } = props;
  const styles = getButtonStyles(style, type);

  const touchProps = {
    onPress: handler,
    style: { ...styles.container, borderWidth: pressed ? 0 : styles.container.borderWidth },
    underlayColor: '#999999',
    onShowUnderlay() {
      togglePressed(true);
    },
    onHideUnderlay() {
      togglePressed(false);
    },
  };

  return (
    <TouchableHighlight {...touchProps} disabled={style === 'disabled' && true}>
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};
