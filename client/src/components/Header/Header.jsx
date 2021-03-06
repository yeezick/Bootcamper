import React from 'react';
import './Header.scss'
export const Header = ({ headerTitle, headerText }) => {

  return ( 
  <header className='header'>
    <h3 className='header-title'>{headerTitle}</h3>
    <p className="header-text">{headerText}</p>
  </header>
  )
};
