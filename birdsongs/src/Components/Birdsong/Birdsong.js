import React from 'react';

const Birdsong = ({ recording }) =>  {
  console.log("in birdsong component", recording)
  return(
    <h2>{recording.en}</h2>
  )
}

export default Birdsong;