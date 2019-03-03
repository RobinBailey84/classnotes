import React  from 'react';

const SinglePirate = (props) => {

  if(!props.pirate){
    return null;
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })

  const onDelete = () => {
    props.handleDelete(props.pirate.id)
  }

  return (
    <div className="component">
        <p>
          {props.pirate.firstName} {props.pirate.lastName}
        </p>
      <p>Age: {props.pirate.age}</p>
      <p>Ship: {props.pirate.ship.name}</p>
      <p>Raids:</p>
      <ul>
        {raids}
      </ul>
      <button onClick={onDelete}>Delete Pirate</button>
    </div>
  )
}

export default SinglePirate;
