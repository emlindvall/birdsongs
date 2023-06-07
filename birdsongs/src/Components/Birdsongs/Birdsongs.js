import React, { useEffect, useState } from 'react';

const Birdsongs = ({ url }) => {
  var [recordings, setRecordings] = useState([]);
  var [error, setError] = useState("");

  useEffect(() => {
    const fetchRecordings = async () => {
      console.log(url)
      try {
        const response = await fetch(url);
        const data = await response.json();
        const firstTwentyResults = data.recordings.slice(0, 20);
        setRecordings(firstTwentyResults);
      } catch (error) {
        setError(error);
      }
    };

    fetchRecordings();
  }, []);

  console.log(recordings)

  return(
    <ul className="here">
      {recordings.map((recording) => (
        <li key={recording.id}>{recording.en}</li>
      ))}
    </ul>
  )
}

export default Birdsongs;