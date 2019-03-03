import React  from 'react';
import Pirate from "./Pirate"
import {Link} from 'react-router-dom';

const PirateDetails = (props) => {
  if (!props.pirate){
    return null
  }

  const handleDelete = () => {
    props.onDelete(props.pirate.id)
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })
  const editUrl = "/pirates/edit/" + props.pirate.id

  return (
    <div className = "component">
        <Pirate pirate = {props.pirate}/>
        <p>Raids:</p>
        <ul>
          {raids}
        </ul>
        <button onClick={handleDelete}>Delete {props.pirate.firstName}</button>
        <Link to= {editUrl}><button type="button">Edit {props.pirate.firstName}</button></Link>
        </div>
  )
}

export default PirateDetails;
