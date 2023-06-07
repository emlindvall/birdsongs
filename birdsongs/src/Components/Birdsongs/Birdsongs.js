// imports
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import './Birdsongs.css';

// component
const Birdsongs = ({ url, location, toggle }) => {
  var [recordings, setRecordings] = useState([]);
  var [error, setError] = useState("");

  useEffect(() => {
    const fetchRecordings = async () => {
      console.log(url);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        const data = await response.json();
        const subset = data.recordings.slice(0, 20);
        setRecordings(subset);
      } catch (error) {
        setError(error);
      }
    };
  
    fetchRecordings();
  }, []);

  
  if (error)  {
    return(
      <Error type={"fetch"} />
    )
  }
  
  if (toggle === true && !recordings.length)  {
    return(
      <Error type={"search"} />
    )
  }

  if (!recordings.length) {
    return(
      <Spinner />
    )
  

  } else {
    return(
      <div className="birdsongs-container">
        <h2>{location}, USA</h2>
        {recordings.map((recording) => (
          <div>
            <p className="common-name" key={recording.id}>{recording.en}</p>
            <p className="scientific+name">{recording.sp} {recording.ssp}</p>
            <audio clasName="audio" src={recording.file} type="audio/mpeg" controls/>
          </div>
        ))}
      </div>
    )
  }
}

export default Birdsongs;

// proptypes