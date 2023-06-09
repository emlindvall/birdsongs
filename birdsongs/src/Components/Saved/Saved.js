// imports
import React from 'react';
import { Link } from 'react-router-dom';
import './Saved.css';

// component
const Saved = ({ savedSongs, handleSelect }) => {
  const capitalize = (unformatted) => {
    let formatted = unformatted.charAt(0).toUpperCase() + unformatted.slice(1);
    return formatted;
  }

  if (!savedSongs.length)  {
    return(
      <div className="saved-songs-container">
        <h2 className="saved-header">Uh Oh!</h2>
        <p>Your saved songs as as scarce as hen's teeth. Once you save a few birdsongs, they'll be here waiting for you.</p>
        <Link to={"/"}><button className="button">HOME</button></Link>
      </div>
    )

  } else {
    return(
      <div className="saved-songs-container">
        <h2 className="saved-header">Saved Songs</h2>
        <div className="saved-container">
          {savedSongs.map((recording) => (
            <div className="recording-container"key={recording.id}>
              <Link to={`/${recording.id}`} style={{ textDecoration: 'none' }} onClick={() => handleSelect(recording)}><p className="common-name">{recording.en}</p></Link>
              <p className="scientific-name">{capitalize(recording.sp)} {recording.ssp}</p>
              <p className="specific-location">{recording.loc}</p>
              <audio className="audio" src={recording.file} type="audio/mpeg" controls/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Saved;

// proptypes