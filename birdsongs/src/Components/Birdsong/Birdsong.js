// imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './Birdsong.css';

// component
const Birdsong = ({ handleFavorite, id }) =>  {
  let [recording, setRecording] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchRecording = async () => {
      try {
        const response = await fetch(`https://xeno-canto.org/api/2/recordings?query=nr:${id}`);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        setLoading(false);
        setRecording(data.recordings[0]);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchRecording();
  }, []);

  const capitalize = (unformatted) => {
    if (!unformatted) return "";
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
    if (!unformatted) return "";
    let dateObject = new Date(unformatted);
    let month = dateObject.toLocaleString('default', { month: 'long' });
    let day = unformatted.slice(8);
    let year = unformatted.slice(0,4);
    return `${month} ${day}, ${year}`;
  }

  if (error) {
    return(
      <Error type={"fetch"}/>
    )
  }
  if (loading) {
      return(
        <Spinner />
      )
  } else {
    return(
      <div className="birdsong-container">
        <h2 className="selected-common-name">{recording.en}</h2>
        <p className="selected-scientific-name">{capitalize(recording.sp)} {recording.ssp}</p>
        <p className="selected-location">{recording.loc}</p>
        <p className="info-medium">{formatData(recording.stage, "age")}, {formatData(recording.sex, "sex")}</p>
        <audio className="selected-audio" src={recording.file} type="audio/mpeg" controls/>
        <p className="info-medium" id="selected-date">Recorded on {formatDate(recording.date, "date")}</p>
        <p className="info-medium" id="selected-recordist">by {recording.rec}</p>
        <p className="info-small" id="selected-remark">{capitalize(recording.rmk)}</p>
        <div className="button-container">
          <button className="button" id="save-button" onClick={() => handleFavorite(recording)}>SAVE SONG</button>
          <Link to={"/search"}><button className="button">BACK</button></Link>
        </div>
      </div>
    )
  }
}

export default Birdsong;

// proptypes