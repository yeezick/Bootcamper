import './SingleActionButton.scss';

export const SingleActionButton = ({ text, onClick = null, type = 'button' }) => {
  return (
    <div className="single-button">
      <button onClick={onClick} type={type}>
        {text}
      </button>
    </div>
  );
};
