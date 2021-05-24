import React from 'react';
import './Header.css';
import { useStateValue } from './StateProvider';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function Header({ spotify, flag, setFlag }) {
  const [{ user }] = useStateValue();
  console.log(flag, setFlag);
  return (
    <div className='header'>
      <div className='emptyBox'></div>
      <div className='searchBox' onClick={() => setFlag((p) => 4)}>
        Spotify search <SearchIcon />
      </div>
      <div className='header__right'>
        <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
