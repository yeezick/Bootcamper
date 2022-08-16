import React, {useState} from 'react'
// import './SingleActionButton.scss';
import {getButtonStyles} from './styles'

export const SingleActionButton = (props) => {

  const { handler, title } = props.payload;
  const { style, type } = props;
  const styles = getButtonStyles(style, type);

  const touchProps = {
    onClick: handler,
    style: { ...styles.container},
  };


  return (
    <div className="single-button">
      <button {...touchProps} type={type}>
        <p style={styles.text}>{title}</p>
      </button>
    </div>
  );
};
