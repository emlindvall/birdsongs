// imports
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './Birdsongs.css';

// component
const Birdsongs = ({ recordings,  location, loading, error, handleSelect }) => {
  if (error)  {
    return(
      <Error type={"fetch"} />
    )
  }

  if (loading && !recordings.length) {
    return <Spinner />
  }

  if (!loading && !recordings.length)  {
    return(
      <Error type={"search"} />
    )

  } else {
    return(
      <div className="results-container">
        <h2 className="general-location">{(location)}, USA</h2>
        <div className="birdsongs-container">
          {recordings.map((recording) => (
            <div className="recording-container"key={recording.id}>
              <Link to={`/${recording.id}`} style={{ textDecoration: 'none' }} onClick={() => handleSelect(recording.id)}><p className="common-name">{recording.english}</p></Link>
              <p className="scientific-name">{recording.latin}</p>
              <p className="specific-location">{(recording.exactLocation)}</p>
              <audio className="audio" src={recording.src} type="audio/mpeg" controls/>
            </div>
          ))}
        </div>
        <Link to={"/search"}><button className="button" id="new-search-button">NEW SEARCH</button></Link>
      </div>
    )
  }
}

export default Birdsongs;

// proptypes
Birdsongs.propTypes = {
  recordings: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  handleSelect: PropTypes.func.isRequired,
  unformatted: PropTypes.string,
}