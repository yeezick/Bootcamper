import { Button } from "react-native";
import "./SingleActionButton.scss";

export const SingleActionButton = ({
  text,
  onClick = null,
  type = "button",
}) => {
  return (
    // <div className="single-button">
    <Button onPress={onClick} type={type} title={text} />
  );
};
