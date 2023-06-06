import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './App.css'
import magpie from '../../assets/birdsongs-magpie.png';



const App = () => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const response = await fetch(
          'https://xeno-canto.org/api/2/recordings?query=loc:illinois+woodpecker'
        );
        const data = await response.json();
        const firstTenResults = data.recordings.slice(0, 20);
        setRecordings(firstTenResults);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    fetchRecordings();
  }, []);

  return (
    <div className="app">
      < Nav />
      <div className="background-container">
        <div className="arc">
          <article className="header-container">
            <p className="header-top">Do my ears deceive me, or was that a buff-bellied pipit?</p>
            <h1 className="header">BIRD SONGS</h1>
            <p className="header-bottom">How well do you know the vocalizations around you? Build your backyard birding skills with Birdsongs!</p>
            <Link to={"/search"}><button className="button">START</button></Link>
          </article>
        </div>
        <img className="magpie" src={magpie}></img>
      </div>
      {/* <ul>
        {recordings.map((recording) => (
          <li key={recording.id}>{recording.en}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;

