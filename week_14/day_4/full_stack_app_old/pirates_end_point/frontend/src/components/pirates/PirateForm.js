import React from 'react';

const PirateForm = (props) => {

  if (!props.ships) return <p>Loading...</p>

  const options = props.ships.map((ship, index) => {
    return <option key={index} value={ship._links.self.href}>{ship.name}</option>
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const pirate = {
      "firstName": event.target.firstName.value,
      "lastName": event.target.lastName.value,
      "age": event.target.age.value,
      "ship": event.target.ship.value
    }
    props.onSubmit(pirate);
  }


  return (
    <div>
        <form onSubmit={handleSubmit} >
          <input type="text" placeholder="First Name" name="firstName"/>
          <input type="text" placeholder="Last Name" name="lastName"/>
          <input type="number" placeholder="Age" name="age"/>
          <select name="ship">
            <option disabled value="default" >Select a ship</option>
            {options}
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
  )
}

export default PirateForm;
