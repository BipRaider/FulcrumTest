import React from 'react';

import Item from '../Navigation/Item/Item';

import s from './Logo.module.css';

const Logo = () => {
  return (
    <Item to={'/'}>
      <div className={s.logoContainer}>
        <h1 className={s.logo}>Fork</h1>
      </div>
    </Item>
  );
};

export default Logo;
