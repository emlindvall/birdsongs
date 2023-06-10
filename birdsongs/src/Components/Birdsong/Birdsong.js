// imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './Birdsong.css';

// component
const Birdsong = ({ handleFavorite, recording, error }) =>  {
  if (error) {
    return(
      <Error type={"fetch"}/>
    )
  }
  if (!recording) {
      return(
        <Spinner />
      )
  } else {
    return(
      <div className="birdsong-container">
        <h2 className="selected-common-name">{recording.english}</h2>
        <p className="selected-scientific-name">{recording.latin}</p>
        <p className="selected-location">{recording.exactLocation}</p>
        <p className="info-medium">{recording.demographics}</p>
        <audio className="selected-audio" src={recording.src} type="audio/mpeg" controls/>
        <p className="info-medium" id="selected-date">{recording.date}</p>
        <p className="info-medium" id="selected-recordist">by {recording.recordist}</p>
        <p className="info-small" id="selected-remark">{recording.notes}</p>
        <div className="button-container">
          <button className="button" id="save-button" onClick={() => handleFavorite(recording)}>SAVE</button>
          <Link to={"/search"}><button className="button">BACK</button></Link>
        </div>
      </div>
    )
  }
}

export default Birdsong;

// proptypes
Birdsong.propTypes = {
  handleFavorite: PropTypes.func,
  recording: PropTypes.object,
  error: PropTypes.bool,
  unformatted: PropTypes.string,
  parameter: PropTypes.string,
  recording: PropTypes.object,
  dateObject: PropTypes.object,
  month:PropTypes.number,
  day:PropTypes.number,
  year: PropTypes.string,
}