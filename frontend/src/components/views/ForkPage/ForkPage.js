import React from 'react';

import ForkForma from '../../presentational/ForkForm/ForkForm';

import style from './ForkPage.module.css';

export default function ForkPage() {
  return (
    <div className={style.wrapper}>
      <ForkForma />
    </div>
  );
}
