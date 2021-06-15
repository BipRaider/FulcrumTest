import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import PrimaryInput from '../../common/PrimaryInput/PrimaryInput';
import BasicButton from '../../common/BasicButton/BasicButton';

import { categoriesOperations } from '../../../redux/categories';

import style from './CategoriesForm.module.css';
import Alert from '../Alert';

const CategoriesForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const changeName = ({ value }) => setName(value);

  const [description, setDescription] = useState('');
  const changeDescription = ({ value }) => setDescription(value);

  const handlerSubmit = e => {
    e.preventDefault();
    categoriesOperations.addCategories({ name, description }, dispatch);
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setDescription('');
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Add Categories</h2>
      <Alert>
        <form className={style.form} onSubmit={handlerSubmit}>
          <div className={style.container}>
            <PrimaryInput value={name} type="text" placeholder="Name *" onChange={changeName} />
            <PrimaryInput
              value={description}
              type="text"
              placeholder="Описание *"
              onChange={changeDescription}
            />
          </div>
          <div className={style.btn_wrapper}>
            <BasicButton type="submit">Add</BasicButton>
          </div>
        </form>
      </Alert>
    </div>
  );
};

export default CategoriesForm;
