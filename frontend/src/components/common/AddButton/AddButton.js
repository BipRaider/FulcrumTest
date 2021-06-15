import React from 'react';

import style from './AddButton.module.css';

const AddButton = ({ type, openMenuAdd }) => {
  return (
    <button className={style.button} id="btn" type={type} onClick={openMenuAdd}>
      +
    </button>
  );
};

export default AddButton;
