import { Text, View } from 'react-native';

export const Header = ({ headerTitle, headerText }) => {
  return (
    // classname header, title, text
    <View>
      <Text>{headerTitle}</Text>
      <Text>{headerText}</Text>
    </View>
  );
};
