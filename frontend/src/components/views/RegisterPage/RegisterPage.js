import React from 'react';

import RegistrationForm from '../../presentational/RegistrationForm/RegistrationForm';

import style from './RegisterPage.module.css';

const RegisterPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegisterPage;
