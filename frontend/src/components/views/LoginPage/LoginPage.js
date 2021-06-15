import React from 'react';

import LoginForm from '../../presentational/LoginForm/LoginForm';

import style from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
