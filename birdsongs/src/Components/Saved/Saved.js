// imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import './Saved.css';

// component
const Saved = ({ savedSongs, handleSelect }) => {
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
              <Link to={`/${recording.id}`} style={{ textDecoration: 'none' }} onClick={() => handleSelect(recording)}><p className="common-name">{recording.english}</p></Link>
              <p className="scientific-name">{recording.latin}</p>
              <p className="specific-location">{recording.exactLocation}</p>
              <audio className="audio" src={recording.src} type="audio/mpeg" controls/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Saved;

// proptypes
Saved.propTypes = {
  savedSongs: PropTypes.array,
  handleSelect: PropTypes.func.isRequired,
  unformatted: PropTypes.string
}