import React, { useEffect, useState } from 'react';

const App = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch(
          'https://xeno-canto.org/api/2/recordings?query=loc:illinois+finch'
        );
        const data = await response.json();
        // Extract the first ten results
        const firstTenResults = data.recordings.slice(0, 20);
        setRecordings(firstTenResults);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    fetchRecordings();
  }, []);

  return (
    <div>
      <h1>Recordings from Illinois</h1>
      <ul>
        {recordings.map((recording) => (
          <li key={recording.id}>{recording.en}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

