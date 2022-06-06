import { StyleSheet, Text, View } from 'react-native';

export const Header = ({ title, text }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'TBD'
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    margin: 10,
  }
})
