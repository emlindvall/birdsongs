// imports
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import './Birdsongs.css';

// component
const Birdsongs = ({ url }) => {
  var [recordings, setRecordings] = useState([]);
  var [error, setError] = useState("");

  useEffect(() => {
    const fetchRecordings = async () => {
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

  console.log(error);
  console.log(recordings);

  if (!recordings.length) {
    return(
      <Spinner />
    )
  } else {
    return(
      <ul className="here">
        {recordings.map((recording) => (
          <li key={recording.id}>{recording.en}</li>
        ))}
      </ul>
    )
  }
}

export default Birdsongs;

// proptypes