import React from 'react';
import './Header.scss';
export const Header = ({ headerTitle }) => {
  return (
    <header className="header">
      <p className="header-title">{headerTitle}</p>
    </header>
  );
};
