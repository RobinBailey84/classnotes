import React from 'react';

const PirateEditForm = (props) => {

if(!props.pirate){
  return null
}
  function handleSubmit(event){
    event.preventDefault();
    const raids = [...event.target.raids.options].filter((option) => {
      return option.selected
    }).map((option) => {
      return option.value
    })

    const pirate = {
        "firstName": event.target.firstName.value,
        "lastName": event.target.lastName.value,
        "age": event.target.age.value,
        "ship": event.target.ship.value,
        "raids": raids
      }
    props.handlePirateUpdate(pirate)
  }



    const shipOptions = props.ships.map((ship, index) => {
      return <option selected = {props.pirate.ship.name === ship.name } key={index} value={ship._links.self.href}>{ship.name}</option>
    })

    const raidOptions = props.raids.map((raid, index) => {
      return <option key={index} selected = {props.pirate.raids[index].location === raid.location } value={raid._links.self.href}>{raid.location}</option>
    })

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" defaultValue={props.pirate.firstName}/>
          <input type="text" name="lastName" defaultValue={props.pirate.lastName}/>
          <input type="number" name="age" defaultValue={props.pirate.age}/>
          <select name="ship">
            {shipOptions}
          </select>
          <select multiple={true} name="raids">
       {raidOptions}
     </select>
          <button type="submit">Save</button>
        </form>
      </div>
    )


}

export default PirateEditForm;
