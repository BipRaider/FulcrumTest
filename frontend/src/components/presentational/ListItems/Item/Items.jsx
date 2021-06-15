import React from 'react';

import s from './Items.module.css';

const Items = ({ name, data, description }) => {
  return (
    <>
      <li className={s.item}>
        <span>{name}</span>
        <span>{description}</span>
        {data && <span>{data.slice(0, -14)}</span>}
      </li>
    </>
  );
};

export default Items;
