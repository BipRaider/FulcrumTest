import React from 'react';

import Item from '../Item/Item';

const UserNav = () => {
  return (
    <>
      <Item to={'/user'} name={'Your interests'} />
      <Item to={'/fork'} name={'Add fork'} />
      <Item to={'/categories'} name={'Add Categories'} />
    </>
  );
};

export default UserNav;
