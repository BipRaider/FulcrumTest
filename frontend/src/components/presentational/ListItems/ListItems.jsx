import React, { useState, useEffect } from 'react';

import Item from './Item';

import s from './ListItems.module.css';

const ListItems = ({ items, name, addCategories }) => {
  const [itemsValue, setItemsValue] = useState(items);
  useEffect(() => {
    if (items) {
      setItemsValue(items);
    }
  }, [items]);

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{name}</h2>
      <ul className={s.list}>
        {itemsValue.map(item => (
          <Item key={item._id} name={item.name} data={item.data} description={item.description} />
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
