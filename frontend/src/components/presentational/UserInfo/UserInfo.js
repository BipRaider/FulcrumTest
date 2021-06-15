import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListItems from '../ListItems';
import { userOperations } from '../../../redux/auth';
import s from './UserInfo.module.css';

export default function UserInfo() {
  const forks = useSelector(state => state.authUser.forks);
  const categories = useSelector(state => state.authUser.categories);
  const token = useSelector(state => state.authUser.accessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    userOperations.getCurrentUser(token, dispatch);
  }, []);

  return (
    <div className={s.container}>
      <ListItems items={categories} name={'Categories'} />
      <ListItems items={forks} name={'Forks'} />
    </div>
  );
}
