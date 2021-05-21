import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from './StateProvider';
import Player from './Player';
import { getTokenFromResponse } from './spotify';
import './App.css';
import Login from './Login';

const s = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();
  const [flag, setFlag] = React.useState(1);

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = '';
    let _token = hash.access_token;

    if (_token) {
      console.log('token', _token);

      s.setAccessToken(_token);
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });
      // albums
      // s.getArtistAlbums(
      //   '43ZHCT0cAZBISjO8DG9PnE',
      //   { limit: 10, offset: 20 },
      //   function (err, data) {
      //     if (err) console.error(err);
      //     else console.log('Artist albums', data);
      //   }
      // );

      // individual playlist fetch in Body.js(discover weekly)
      s.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        });
      });

      s.getMyTopArtists().then((response) =>
        dispatch({
          type: 'SET_TOP_ARTISTS',
          top_artists: response,
        })
      );

      dispatch({
        type: 'SET_SPOTIFY',
        spotify: s,
      });

      s.getMe().then((user) => {
        // console.log(user);
        dispatch({
          type: 'SET_USER',
          user,
        });
      });
    }
  }, [token, dispatch]);

  return (
    <div className='app'>
      {!token && <Login />}
      {token && <Player spotify={s} flag={flag} setFlag={setFlag} />}
    </div>
  );
}

export default App;
