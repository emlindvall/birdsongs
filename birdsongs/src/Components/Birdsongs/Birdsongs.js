import React from 'react';

const Birdsongs = ({ location, query }) => {

  // const [recordings, setRecordings] = useState([]);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchRecordings = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://xeno-canto.org/api/2/recordings?query=loc:{location}+{query}'
  //       );
  //       const data = await response.json();
  //       const firstTwentyResults = data.recordings.slice(0, 20);
  //       setRecordings(firstTwentyResults);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchRecordings();
  // }, []);


  console.log("IN BIRDSONGS", location, query)
  return(
    <p>wtf</p>
  )
}

export default Birdsongs;