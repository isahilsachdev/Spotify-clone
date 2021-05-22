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

  const HandleSearch = async (e) => {
    e.preventDefault();
    setSearchFlag((prev) => true);
    spotify.searchTracks(searchSong).then((res) => {
      setId((prev) => res.tracks.items[0].artists[0].id);
      dispatch({
        type: 'SET_SEARCH_SONG',
        searchSongs: res.tracks.items,
      });
    });
  };
  console.log(info.name, searchSong);

  React.useEffect(() => {
    spotify.getArtist(id).then((res) => {
      console.log(res);
      setInfo({ url: res.images[0].url, name: res.name, type: res.type });
    });
  }, [id, dispatch]);

  const playSong = (id) => {
    console.log(id);
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
            // onKeyDown={HandleSearch}
          />
          <input type='submit' className='header__button' value='Search' />
        </form>
        <div className='header__right'>
          <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
          <h4>{user?.display_name}</h4>
        </div>
      </div>
      {/* header end */}
      {!searchFlag && !id ? (
        <div className='body__info'>
          <img src={top_artists?.items[0].images[0].url} alt='artist' />
          <div className='body__infoText'>
            <h2>SEARCH YOUR FAVOURITE ARTIST OR SONGS</h2>
          </div>
        </div>
      ) : (
        <div className='body__info'>
          <img src={info.url} alt='artist' />
          <div className='body__infoText'>
            <strong style={{ textTransform: 'uppercase' }}>{info.type}</strong>
            <h2>{info.name}</h2>
          </div>
        </div>
      )}
      {/* searched songs information */}
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon className='body__shuffle' />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
        {searchSongs?.map((item) => (
          <SongRowSearch key={item.id} playSong={playSong} track={item} />
        ))}
        <div style={{ height: '50px', marginTop: '130px' }}></div>
      </div>
    </div>
  );
};

export default SearchPage;
