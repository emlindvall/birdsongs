// imports
import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error/Error';
import './Birdsong.css';

// component
const Birdsong = ({ recording, handleFavorite }) =>  {
  const capitalize = (unformatted) => {
    let formatted = unformatted.charAt(0).toUpperCase() + unformatted.slice(1);
    return formatted;
  }

  const formatData = (unformatted, parameter) =>  {
    if (!unformatted || unformatted === "uncertain") {
      return `${capitalize(parameter)} unknown`;
    } else {
      return capitalize(unformatted);
    }
  }

  const formatDate = (unformatted)  =>  {
    let dateObject = new Date(unformatted);
    let month = dateObject.toLocaleString('default', { month: 'long' });
    let day = unformatted.slice(8);
    let year = unformatted.slice(0,4);
    return `${month} ${day}, ${year}`;
  }

  if (!recording) {
    return(
      <Error type={"redirect"}/>
    )
  } else {
    return(
      <div className="birdsong-container">
        <h2 className="selected-common-name">{recording.en}</h2>
        <p className="selected-scientific-name">{capitalize(recording.sp)} {recording.ssp}</p>
        <p className="selected-location">{recording.loc}</p>
        <p className="info-medium">{formatData(recording.stage, "age")}, {formatData(recording.sex, "sex")}</p>
        <audio className="selected-audio" src={recording.file} type="audio/mpeg" controls/>
        <p className="info-medium">Recordeded on {formatDate(recording.date, "date")}</p>
        <p className="info-medium">by {recording.rec}</p>
        <p className="info-small">{capitalize(recording.rmk)}</p>
        <div className="button-container">
          <button className="button" onClick={() => handleFavorite(recording)}>SAVE SONG</button>
          <Link to={"/search"}><button className="button">BACK</button></Link>
        </div>
      </div>
    )
  }
}

export default Birdsong;

// proptypes