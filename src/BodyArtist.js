import axios from 'axios';
import React from 'react';
import { useStateValue } from './StateProvider';
import './Body.css';
import './Home.css';
import Header from './Header';
import SongRow from './SongRow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const BodyArtist = (spotify) => {
  const [{ artistAlbum, artistDescription }, dispatch] = useStateValue();

  console.log('artistAlbum in artist album', artistAlbum);
  console.log('artistDescription in artist album', artistDescription);
  const playPlaylist = (id) => {
    spotify
      .play({
        // we have to change here uri
        context_uri: `spotify:playlist:30NLuCzTLTOBcuyi2QiUrG`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          // console.log('this is the current playing tracks', r);
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
      <Header spotify={spotify} />
      <div className='body__info'>
        <img src={artistDescription[1]} alt='artist' />
        <div className='body__infoText'>
          <strong>ARTIST</strong>
          <h2>{artistDescription[0]}</h2>
        </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon
            className='body__shuffle'
            onClick={playPlaylist}
          />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>
      </div>
      <h1 className='artists__head'>ALBUMS</h1>
      <div className='album__container'>
        {artistAlbum?.items?.map((album) => {
          return (
            <div key={album.id} className='album__block'>
              <img src={album.images[0].url} alt='artist' />
              <br />
              <strong>ALBUM</strong>
              <p>{album.name}</p>
            </div>
          );
        })}
      </div>
      <div style={{ height: '200px', width: '100%' }}></div>
    </div>
  );
};

export default BodyArtist;
