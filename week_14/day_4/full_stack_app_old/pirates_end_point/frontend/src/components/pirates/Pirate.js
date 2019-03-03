import React  from 'react';
import {Link} from 'react-router-dom';

const Pirate = (props) => {
  if(!props.pirate){
    return null;
  }
  return (
    <div className="component">
      <Link to={"/pirates/" + props.pirate.id}>   {props.pirate.firstName} {props.pirate.lastName}</Link>
      <p>Age: {props.pirate.age}</p>
      <p>Ship: {props.pirate.ship.name}</p>
    </div>
  )
}

export default Pirate;
