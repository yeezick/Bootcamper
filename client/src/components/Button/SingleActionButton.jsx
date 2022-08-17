import './SingleActionButton.scss';

/**
 * @name SingleActionButton
 * @param {Object} payload - Contains the handler and button text
 * @param {string} style -  Decides which color scheme (disabled/light) should be applied. If empty, default style is applied.
 * @param {string} size - Decides whether the width of the button (long). If empty, button is short.
 */
export const SingleActionButton = (props) => {
  const { handler, title } = props.payload;
  const { style, size } = props;

  // const styleSheet = `single-button ${style} ${size}`;

  return (
    <div className={`single-button ${style} ${size}`}>
      <button onClick={handler}>
        <p>{title}</p>
      </button>
    </div>
  );
};
