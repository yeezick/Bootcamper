import { Button } from "react-native";
import { Alert } from "react-native-web";
import "./DoubleActionButton.scss";

export const DoubleActionButton = ({
  leftText,
  leftOnClick,
  leftType = "button",
  rightText,
  rightOnClick,
  rightType = "button",
  onClick,
}) => {
  return (
    <div className="double-button" onClick={onClick}>
      <Button
        title="button"
        onPress={() => Alert.alert("Simple button pressed")}
      />
      <button className="left" onClick={leftOnClick} type={leftType}>
        {leftText}
      </button>
      <div className="separator">|</div>
      <button
        className="right"
        onClick={rightOnClick}
        type={rightType}
        value={rightText}
      >
        {rightText}
      </button>
    </div>
  );
};
