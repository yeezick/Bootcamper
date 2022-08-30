import React from 'react';
import './Header.scss';
export const Header = ({ headerTitle }) => {
  return (
    <header className="header">
      <h2 className="header-title">{headerTitle}</h2>
    </header>
  );
};
