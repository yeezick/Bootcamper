import { Button, Text, View } from 'react-native';

export const DoubleActionButton = ({ leftText, leftOnClick, rightText, rightOnClick }) => {
  return (
    <View className="double-button">
      <Button className="left" onPress={leftOnClick} title={leftText} />
      <Text className="separator">|</Text>
      <Button className="right" onPress={rightOnClick} title={rightText} />
    </View>
  );
};
