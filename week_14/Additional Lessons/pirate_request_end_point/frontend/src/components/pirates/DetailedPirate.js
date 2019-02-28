import React  from 'react';
import BasicPirate from "./BasicPirate"

const DetailedPirate = (props) => {
  if (!props.pirate){
    return null
  }

  const handleDelete = () => {
    props.onDelete(props.pirate.id)
  }

  const handleEdit = () => {
    window.location = "/pirates/edit/" + props.pirate.id;
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })

  return (
    <div className = "component">
        <BasicPirate  pirate = {props.pirate}/>
        <p>Raids:</p>
        <ul>
          {raids}
        </ul>
        <button onClick={handleDelete}>Delete {props.pirate.firstName}</button>
        <button onClick={handleEdit}>Edit {props.pirate.firstName}</button>
        </div>


  )
}

export default DetailedPirate;
