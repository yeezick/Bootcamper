import React from 'react';

const Button = ({
  buttonStyle,
  children,
  onClick,
  type,
 }) => {


  const STYLES = [
    'btn-primary',
    'btn-secondary',
    'btn-variart',
  ]

const checkButtonStyle = STYLES.includes(buttonStyle)
  ? buttonStyle
  : STYLES[0]

  return (
    <button
    className={`btn ${checkButtonStyle}`}
    onClick={onClick}
    type={type}
    >
  {children}
  </button>
  )
};

export default Button;
