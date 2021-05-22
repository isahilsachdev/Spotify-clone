import React from 'react';
import Footer from './Footer';
import './Player.css';
import Sidebar from './Sidebar';
import Body from './Body';
import BodyArtist from './BodyArtist';
import Home from './Home';
import SearchPage from './SearchPage';

function Player({ spotify, flag, setFlag }) {
  return (
    <div className='player'>
      <div className='player__body'>
        <Sidebar s={spotify} flag={flag} setFlag={setFlag} />
        {flag === 1 ? (
          <Home s={spotify} flag={flag} setFlag={setFlag} />
        ) : flag === 2 ? (
          <Body spotify={spotify} />
        ) : flag === 3 ? (
          <BodyArtist spotify={spotify} />
        ) : (
          <SearchPage spotify={spotify} flag={flag} setFlag={setFlag} />
        )}
      </div>
      <Footer spotify={spotify} />
    </div>
  );
}

export default Player;
