import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { forksOperations } from '../../../redux/forks';

import PrimaryInput from '../../common/PrimaryInput/PrimaryInput';
import BasicButton from '../../common/BasicButton/BasicButton';
import CategoriesType from './CategoriesType';

import Alert from '../Alert';

import style from './ForkForm.module.css';

const ForkForm = () => {
  const firstItem = useSelector(state => state.categories[1]._id);

  const dispatch = useDispatch();
  const history = useHistory();

  if (!firstItem) {
    console.dir('s');
  }

  const [name, setName] = useState('');
  const changeName = ({ value }) => setName(value);

  const [description, setDescription] = useState('');
  const changeDescription = ({ value }) => setDescription(value);

  const [categories, setCategories] = useState(firstItem);
  const changeCategoriesType = ({ value }) => setCategories(value);

  const handlerSubmit = e => {
    e.preventDefault();

    forksOperations.addFork({ name, description, categories }, dispatch);

    clearForm();
  };

  const clearForm = () => {
    setName('');
    setDescription('');
    setCategories('');
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Add fork</h2>
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

            <CategoriesType onChange={changeCategoriesType}></CategoriesType>
          </div>
          <div className={style.btn_wrapper}>
            <BasicButton type="submit">Add</BasicButton>
          </div>
        </form>
      </Alert>
    </div>
  );
};

export default ForkForm;
