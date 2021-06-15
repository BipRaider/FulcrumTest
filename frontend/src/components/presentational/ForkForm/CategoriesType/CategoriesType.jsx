'use strick';

import React from 'react';
import { useSelector } from 'react-redux';

import styles from './CategoriesType.module.css';

const CategoriesType = ({ ...props }) => {
  const { onChange } = props;

  const categories = useSelector(state => state.categories);

  return (
    <select className={styles.select} size="1" onChange={({ target }) => onChange(target)}>
      {categories.map(item => (
        <option key={item._id} value={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default CategoriesType;
