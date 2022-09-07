import './SingleActionButton.scss';

/**
 * @name SingleActionButton
 * @param {Object} payload - Contains the handler and button text
 * @param {string} style -  Decides which color scheme (disabled/light) should be applied. If empty, default style is applied.
 * @param {string} size - Decides whether the width of the button (long). If empty, button is short.
 */
export const SingleActionButton = (props) => {
  console.log(props.payload)
  const { title } = props.payload;
  const { style, size } = props;
  const isDisabled = style === 'disabled' ? true : false;

  return props.payload.handler ? (
    <button
      className={`single-button ${style} ${size ? size : ''}`}
      disabled={isDisabled}
      onClick={props.payload.handler}
    >
      {title}
    </button>
  ) : (
    <button
    className={`single-button ${style} ${size ? size : ''}`}
    disabled={isDisabled}
  >
    {title}
  </button>);
};
