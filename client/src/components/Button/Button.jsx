import './Button.scss'

export const Button = ({
  buttonStyle,
  children,
  onClick,
  onSubmit,
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
    onSubmit={onSubmit}
    type={type}
    >
  {children}
  </button>
  )
};


