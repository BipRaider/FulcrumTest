import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { forksOperations } from '../../../redux/forks';
import { categoriesOperations } from '../../../redux/categories';

import ListItems from '../ListItems';

import s from './MainInfo.module.css';

export default function MainInfo() {
  const forks = useSelector(state => state.forks);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    forksOperations.getForks(dispatch);
    categoriesOperations.getCategories(dispatch);
  }, []);

  const addCategories = e => {
    console.dir(e);
  };

  return (
    <div className={s.container}>
      <ListItems items={categories} onChange={addCategories} name={'Categories'} />
      <ListItems items={forks} name={'Forks'} />
    </div>
  );
}
