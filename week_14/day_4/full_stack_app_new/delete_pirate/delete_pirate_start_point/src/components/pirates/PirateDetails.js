import React  from 'react';
import Pirate from "./Pirate"

const PirateDetails = (props) => {
  if (!props.pirate){
    return null
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })

  return (
    <div className = "component">
      <Pirate pirate = {props.pirate}/>
      <p>Raids:</p>
      <ul>
        {raids}
      </ul>
    </div>
  )
}

export default PirateDetails;
