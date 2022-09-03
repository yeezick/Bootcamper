import { Text } from 'react-native';
export const ConfirmedPasswordMessage = ({ status }) => {
  if (status) {
    return <Text>Password is confirmed</Text>;
  } else return <Text>INCORRECT PASSWORD</Text>;
};
