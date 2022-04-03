import { Button, Text, View } from 'react-native';
import { Alert } from 'react-native-web';

export const DoubleActionButton = ({
  leftText,
  leftOnClick,
  leftType = 'button',
  rightText,
  rightOnClick,
  rightType = 'button',
  onClick,
}) => {
  return (
    <View className="double-button" onClick={onClick}>
      <Button className="left" onClick={leftOnClick} title={leftText} type={leftType} />
      <Text className="separator">|</Text>
      <Button
        className="right"
        onClick={rightOnClick}
        title={rightText}
        type={rightType}
        value={rightText}
      />
    </View>
  );
};
