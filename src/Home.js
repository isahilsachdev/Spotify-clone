import React from 'react';
import { useStateValue } from './StateProvider';
import './Body.css';
import './Home.css';
import Header from './Header';

function Home({ s, flag, setFlag }) {
  const [{ top_artists, playlists }, dispatch] = useStateValue();

  const changePlaylist = (id) => {
    setFlag((prev) => 2);
    s.getPlaylist(id).then((response) =>
      dispatch({
        type: 'SET_DISCOVER_WEEKLY',
        discover_weekly: response,
      })
    );
  };
  const changeArtistAlbum = (id, name, image) => {
    setFlag((prev) => 3);
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
    <div className='body'>
      <Header spotify={s} flag={flag} setFlag={setFlag} />
      <h1 className='artists__head'>Artists</h1>
      <br />
      <div className='artists__container'>
        {top_artists?.items?.map((item) => {
          return (
            <div
              key={item.id}
              className='artists__block'
              onClick={() =>
                changeArtistAlbum(item.id, item.name, item.images[0].url)
              }
            >
              <img src={item.images[0].url} alt='artist' />
              <br />
              <strong style={{ color: '#1db954' }}>ARTIST</strong>
              <h3>{item.name}</h3>
              <div className='artists__generes'>
                {item.genres.map((gen, i) => {
                  return <p key={i}> {gen} </p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      {/* below is playlists */}
      <h1 className='artists__head'>Your Playlists</h1>
      <br />
      <div className='artists__container'>
        {playlists?.items?.map((item) => {
          return (
            <div
              key={item.id}
              className='artists__block'
              onClick={() => changePlaylist(item.id)}
            >
              <img src={item?.images[0].url} alt='artist' />
              <br />
              <strong style={{ color: '#1db954' }}>PLAYLIST</strong>
              <h3>{item.name}</h3>
              <div style={{ color: 'gray' }}>{item.description}</div>
            </div>
          );
        })}
      </div>
      <div style={{ height: '200px', width: '100%' }}></div>
    </div>
  );
}

export default Home;
