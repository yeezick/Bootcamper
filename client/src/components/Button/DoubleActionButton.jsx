import './DoubleActionButton.scss';

export const DoubleActionButton = ({
  leftText,
  leftOnClick,
  leftType = 'button',
  rightText,
  rightOnClick,
  rightType = 'button',
  onClick,
}) => {
  // remove onClick, let the right/left onClicks handle the modal closing instead
  return (
    <div className="double-button" onClick={onClick}>
      <button className="left" onClick={leftOnClick} type={leftType}>
        {leftText}
      </button>
      <div className="separator">|</div>
      <button className="right" onClick={rightOnClick} type={rightType} value={rightText}>
        {rightText}
      </button>
    </div>
  );
};
