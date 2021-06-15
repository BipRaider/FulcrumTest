import React from 'react';

import { loader } from './Loader.module.css';

const isLoader = () => {
  return (
    <>
      <div className={loader}>Loading...</div>
    </>
  );
};

export default isLoader;
