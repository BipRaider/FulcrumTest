import React from 'react';

import UserInfo from '../../presentational/UserInfo/UserInfo';

import s from './UserPage.module.css';

const UserPage = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <UserInfo />
      </div>
    </div>
  );
};

export default UserPage;
