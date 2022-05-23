import React, { useState } from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';

import { useStateValue } from './StateProvider';

function Sidebar({ s, flag, setFlag }) {
  const [{ playlists, top_artists }, dispatch] = useStateValue();
  const [currentSidebarOption, setCurrentSidebarOption] = useState('');

  const changePlaylist = (id, name) => {
    setFlag((prev) => 2);
    name && setCurrentSidebarOption(name);
    s.getPlaylist(id).then((response) =>
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response,
      })
    );
  };
  const changeArtistAlbum = (id, name, image) => {
    setFlag((prev) => 3);
    name && setCurrentSidebarOption(name);
    s.getArtistAlbums(id).then((response) => {
      dispatch({
        type: 'SET_ARTIST_ALBUM',
        artistAlbum: response,
      });
      dispatch({
        type: 'SET_ARTIST_DESCRIPTION',
        artistDescription: [name, image],
      });
    });
  };

  return (
    <div className='sidebar'>
      <img
        className='sidebar__logo'
        src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg'
        alt=''
      />
      <SidebarOption
        changeFlag={() => setFlag((prev) => 1)}
        Icon={HomeIcon}
        option='Home'
      />
      <SidebarOption
        changeFlag={() => setFlag((prev) => 4)}
        Icon={SearchIcon}
        option='Search'
      />
      <SidebarOption
        changeFlag={() => setFlag((prev) => 1)}
        Icon={LibraryMusicIcon}
        option='Your Library'
      />
      <br />
      {playlists?.items?.length && <strong className='sidebar__title'>PLAYLISTS</strong>}
      <hr />
      {playlists?.items?.map((playlist, i) => (
        <div
          key={i}
          onClick={() => changePlaylist(playlist.id, playlist.name)}
          className='sidebarOption'
          style={{color: `${currentSidebarOption === playlist.name ? 'white' : ''}`} }
        >
          <p>{playlist.name}</p>
        </div>
      ))}
      <br />
      {top_artists?.items?.length && <strong className='sidebar__title'>ARTISTS</strong>}
      <hr />
      {top_artists?.items?.map((artist, i) => (
        <div
          key={i}
          onClick={() =>
            changeArtistAlbum(artist.id, artist.name, artist.images[0].url)
          }
          className='sidebarOption'
          style={{color: `${currentSidebarOption === artist.name ? 'white' : ''}`} }
        >
          <p>{artist.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
