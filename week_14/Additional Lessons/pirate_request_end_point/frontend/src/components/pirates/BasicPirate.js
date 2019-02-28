import React  from 'react';

const BasicPirate = (props) => {

  if (!props.pirate){
    return null
  }
  const url = "/pirates/" + props.pirate.id;
  return (
    <React.Fragment>
        <a className="name" href={url} >
          {props.pirate.firstName} {props.pirate.lastName}
        </a>
      <p>Age: {props.pirate.age}</p>
      <p>Ship: {props.pirate.ship.name}</p>
      </React.Fragment>

  )
}

export default BasicPirate;
