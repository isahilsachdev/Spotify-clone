import React from 'react';
import './Header.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';

function Header({ spotify, flag, setFlag }) {
  const [{ user }] = useStateValue();

  return (
    <div className='header'>
      <div style={{ display: 'flex', flex: '0.5' }}></div>
      <div className='header__right'>
        <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
