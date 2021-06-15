import React from 'react';

import CategoriesForma from '../../presentational/CategoriesForm/CategoriesForm';

import style from './CategoriesPage.module.css';

export default function CategoriesPage() {
  return (
    <div className={style.wrapper}>
      <CategoriesForma />
    </div>
  );
}
