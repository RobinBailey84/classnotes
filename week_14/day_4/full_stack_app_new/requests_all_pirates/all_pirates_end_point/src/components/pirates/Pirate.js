import React  from 'react';

const Pirate = (props) => {

  if (!props.pirate){
    return null
  }
  return (
    <React.Fragment>
    <p>
    {props.pirate.firstName} {props.pirate.lastName}
    </p>
    <p>Age: {props.pirate.age}</p>
    <p>Ship: {props.pirate.ship.name}</p>
    </React.Fragment>
  )
}

export default Pirate;
