import React from 'react';

import ItemBar from '../Item/Item';

const AuthNav = () => {
  return (
    <>
      <ItemBar to={'/login'} name={'Login'} />
      <ItemBar to={'/register'} name={'Register'} />
    </>
  );
};

export default AuthNav;
