import React from 'react';
import './Header.scss';

/**
 * @name Header
 * @param {string} title - contains the title text of the Header
 */

export const Header = ({ headerTitle }) => {
  return (
    <header className="header">
      <p className="header-title">{headerTitle}</p>
    </header>
  );
};
