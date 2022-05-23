import React from 'react';
import './Header.css';
import './Body.css';
import { useStateValue } from './StateProvider';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SongRowSearch from './SongRowSearch';
const SearchPage = ({ spotify }) => {
  const [searchSong, setSearchSong] = React.useState('');
  const [searchFlag, setSearchFlag] = React.useState(false);
  const [{ user, searchSongs, top_artists }, dispatch] = useStateValue();
  const [info, setInfo] = React.useState({});
  const [id, setId] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    spotify.getArtist(id).then((res) => {
      setInfo({ url: res.images[0].url, name: res.name, type: res.type });
    });
  }, [id, dispatch]);

  const HandleSearch = async (e) => {
    e.preventDefault();
    setSearchFlag((prev) => true);
    spotify.searchTracks(searchSong).then((res) => {
      setId((prev) => res?.tracks?.items[0]?.artists[0].id);
      setIsError(false);
      if (!res?.tracks?.items?.length) {
        setIsError(true);
      }
      dispatch({
        type: 'SET_SEARCH_SONG',
        searchSongs: res.tracks?.items,
      });
    }).catch(err => {
      setIsError(true);
    });
  };

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      });
  };
  return (
    <div className='body'>
      <div className='header'>
        <form onSubmit={HandleSearch} className='header__left'>
          <SearchIcon />
          <input
            placeholder='Search for Artists, Songs, or Podcasts'
            type='text'
            onChange={(e) => setSearchSong(e.target.value)}
          />
          <input
            style={{ fontweight: '700' }}
            type='submit'
            className='header__button'
            value='Search'
          />
        </form>
        <div className='header__right'>
          <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
          <h4>{user?.display_name}</h4>
          <div onClick={() => window.location.reload()} style={{ color: '#1db954', cursor: 'pointer' }} className='header__right'>
            <h4>Log out</h4>
          </div>
        </div>
      </div>
      {/* header end */}
      {!searchFlag && !id ? (
        <div className='body__info'>
          <img src={top_artists?.items[0].images[0].url} alt='' />
          <div className='body__infoText'>
            <h2>SEARCH YOUR FAVOURITE ARTIST OR SONGS</h2>
          </div>
        </div>
      ) : isError ? (
        <div>
          <img style={{ width: '150px' }} src='/favicon.ico' alt='no result found' />
          <div className='body__infoText'>
            <strong style={{ textTransform: 'uppercase' }}>No result found</strong>
          </div>
        </div>
      ) : (
        <div className='body__info'>
          <img src={info.url} alt='' />
          <div className='body__infoText'>
            <strong style={{ textTransform: 'uppercase' }}>{info.type}</strong>
            <h2>{info.name}</h2>
          </div>
        </div>
      )}
      {/* searched songs information */}
      <div className='body__songs'>
        {!isError && (
          <div className='body__icons'>
            <PlayCircleFilledIcon className='body__shuffle' />
            <FavoriteIcon fontSize='large' />
            <MoreHorizIcon />
          </div>
        )}
        {searchSongs?.map((item) => (
          <SongRowSearch key={item.id} playSong={playSong} track={item} />
        ))}
        <div style={{ height: '50px', marginTop: '130px' }}></div>
      </div>
    </div>
  );
};

export default SearchPage;
