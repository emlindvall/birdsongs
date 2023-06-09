// imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './Birdsongs.css';

// component
const Birdsongs = ({ url, location, handleSelect }) => {
  let [recordings, setRecordings] = useState([]);
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchRecordings = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        const subset = data.recordings.slice(0, 20);
        setLoading(false);
        setRecordings(subset);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchRecordings();
  }, []);

  const capitalize = (unformatted) => {
    let formatted = unformatted.charAt(0).toUpperCase() + unformatted.slice(1);
    return formatted;
  }

  const formatLocation = (unformatted) => {
    let formatted = unformatted.replace("_", " ");
    return formatted;
  }

  const formatExactLocation = (unformatted) => {
    let trim = (unformatted.length - (location.length + 2));
    let formatted = unformatted.slice(0, trim);
    return formatted;
  }
  

  if (error)  {
    return(
      <Error type={"fetch"} />
    )
  }

  if (loading) {
    return(
      <Spinner />
    )
  }

  if (!loading && !recordings.length)  {
    return(
      <Error type={"search"} />
    )

  } else {
    return(
      <div className="results-container">
        <h2 className="general-location">{formatLocation(location)}, USA</h2>
        <div className="birdsongs-container">
          {recordings.map((recording) => (
            <div className="recording-container"key={recording.id}>
              <Link to={`/${recording.id}`} style={{ textDecoration: 'none' }} onClick={() => handleSelect(recording)}><p className="common-name">{recording.en}</p></Link>
              <p className="scientific-name">{capitalize(recording.sp)} {recording.ssp}</p>
              <p className="specific-location">{formatExactLocation(recording.loc)}</p>
              <audio className="audio" src={recording.file} type="audio/mpeg" controls/>
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