import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import './Footer.css';
import { Grid, Slider } from '@material-ui/core';

function Footer({ spotify }) {
  const [{ item, playing }, dispatch] = useStateValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      dispatch({
        type: 'SET_PLAYING',
        playing: r.is_playing,
      });

      dispatch({
        type: 'SET_ITEM',
        item: r.item,
      });
    });
  }, [spotify, dispatch]);

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false,
      });
    } else {
      spotify.play();
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    }
  };

  const skipNext = () => {
    spotify.skipToNext();
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
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
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
  };

  return (
    <div className='footer'>
      <div className='footer__left'>
        <img
          className='footer__albumLogo'
          src={item?.album.images[0].url}
          alt=''
        />
        {item ? (
          <div className='footer__songInfo'>
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ) : (
          <div className='footer__songInfo'>
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className='footer__center'>
        <ShuffleIcon className='footer__green' />
        <SkipPreviousIcon onClick={skipPrevious} className='footer__icon' />
        {playing ? (
          <PauseCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        ) : (
          <PlayCircleOutlineIcon
            onClick={handlePlayPause}
            fontSize='large'
            className='footer__icon'
          />
        )}
        <SkipNextIcon onClick={skipNext} className='footer__icon' />
        <RepeatIcon className='footer__green' />
      </div>
      <div className='footer__right'>
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon style={{ fontSize: '2.5rem' }} />
          </Grid>
          <Grid item>
            <VolumeDownIcon style={{ fontSize: '2.5rem' }} />
          </Grid>
          <Grid item width='300px' lg>
            <Slider
              style={{ width: '150px' }}
              aria-labelledby='continuous-slider'
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
