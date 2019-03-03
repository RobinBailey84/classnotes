# React Requests - Create Pirate

## Learning Objectives

- Understand how to edit a pirate in our API

## Duration
1.5 hour.

# Intro

Last but not least we want to be able to edit a pirate.

This may be to update name, age or ship or to add/remove raids.

# Edit form route.

> Either use end point from create lesson or start point.

Again we will need to create a route for this to show our form.

The route we will define will be `/pirates/edit/:id`.

We will have this route render a `PirateEditFormContainer` which we will import at the top.

When we are creating this form we will need to pass in the pirate and also the list of ships and raids from our container. So we will need to get the id from the params and use our `findPirateById` method again.


```js
// MainContainer.js

import PirateEditFormContainer from './containers/pirates/PirateEditFormContainer';

// AS BEFORE
      <Route exact path = '/pirates/new' render={(props) =>{
        return <PirateFormContainer ships={this.state.ships} />
      }}/>

      {/* EDIT ONE PIRATE */}
      <Route exact path="/pirates/edit/:id" render={(props) =>{
        const id = props.match.params.id
        const pirate = this.findPirateById(id);
        return <PirateEditFormContainer pirate={pirate} ships={this.state.ships} raids = {this.state.raids}/>
      }}/>

```

Next we will add a new link to our PirateDetails component to hit this route. To style it like the button we can actually just pass in a button in  between the Link tags.

```js
//PirateDetails.js

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
```

## Pirate Edit Form Container

Let's create our container that will handle all of the logic to edit our Pirate.

```bash
touch src/containers/PirateEditFormContainer.js

```

And create this as a new class.

```js
// App.js
import React, {Component} from 'react';

class PirateEditFormContainer extends Component {

}

export default PirateEditFormContainer;
```

## POST method

We want to update the API so we will need to write a PATCH method in our request helper. We will use PATCH instead of PUT, as this handles many to many relationships better.

Again this will take in a url and a payload to update. Much like post we will define the method, headers and also a body to update. If you remember when we posted using insomnia our body looked something like this:

```js
// request.js

patch(url, payload){
  return fetch(url, {
    method: "PATCH",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
}
```

Next we will create a method in the form container to call the patch.

The url to update the api will be `/api/pirates/id`. After the update we will redirect back to our pirate. Don't forget to bind this in the constructor.

```js
// PirateEditFormContainer.js

constructor(props){
    super(props);
    this.handlePirateUpdate = this.handlePirateUpdate.bind(this);
  }

  handlePirateUpdate(pirate){
    const request = new Request();
    request.patch('/api/pirates/' + this.props.pirate.id, pirate).then(() => {
      window.location = '/pirates/' + this.props.pirate.id
    })
  }
```

Next we will render a form component and pass in the ships, raids and the handler method as props.

```js
// PirateEditFormContainer.js

// AS BEFORE

render(){

    return <PirateEditForm ships = {this.props.ships} pirate = {this.props.pirate} raids = {this.props.raids} handlePirateUpdate= {this.handlePirateUpdate} />

  }
```

And import this in the form container

```js
// PirateEditFormContainer.js

import PirateEditForm from '../../components/pirates/PirateEditForm';
```

OK so now let's create the form component.

```bash
touch src/components/pirates/PirateEditForm.js
```

And let's set this up. Again we will make sure that the passed in pirate isn't null.

```js
// PirateEditForm.js

import React from 'react';

const PirateEditForm = (props) => {
  if(!props.pirate){
      return null
    }
    
  return (

  )
}

export default PirateEditForm;

```

Now we can create a form and create inputs for the name, age and ships first of all as we have done before. We can set the name and age using defaultValues so that they are already populated.


```js
// PirateEditForm.js

const shipOptions = props.ships.map((ship, index) => {
    return <option key={index} value={ship._links.self.href}>{ship.name}</option>
  })

return (
    <div>
      <form>
        <input type="text" name="firstName" defaultValue={props.pirate.firstName}/>

        <input type="text" name="lastName" defaultValue={props.pirate.lastName}/>

        <input type="number" name="age" defaultValue={props.pirate.age}/>

        <select name="ship">
          {shipOptions}
        </select>

    <button type="submit">Save</button>
    </form>
    </div>
  )
```

This does give us a bit of an issue with the default value of the ship as the value needs to be the HAETOS link to the ship (i.e. `localhost:8080/api/ships/1`). pirate.ship only brings back the ship name.

We will need to loop through the ships and find the one that matches the pirate and then grab it's link.

We will write a function to get this.

```js
// PirateEditForm
const pirateHasRaid = (raid) => {
  return props.pirate.raids.some((pirateRaid) => {
    return pirateRaid.location === raid.location;
  })
}

const findShipLink = () => {
  const foundShip = props.ships.find((ship) => {
    return  ship.name === props.pirate.ship.name;
  })

  return foundShip._links.self.href;
}
```

And set this to be the defaultValue of the select.

```js
// PirateEditForm

<select name="ship" defaultValue={findShipLink()}>
  {shipOptions}
  </select>
  <button type="submit">Save</button>
```

Next we will need to do the same for the pirates raids.

As the pirate can have multiple raids we can use a multiple select.

First we will crate a set of options and add them to a multiple select.


```js
// PirateForm.js

const raidOptions = props.raids.map((raid, index) => {
    return <option key={index}  value={raid._links.self.href}>{raid.location}</option>
  })

  return (
    <div>
      <form>
        // AS BEFORE

        <select multiple={true} name="raids">
          {raidOptions}
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  )
```

Again we will have to find the raids attached to the pirate so we can set these as being selected as default value.

```js
// PirateEditForm.js

// Underneath findShipLinks

const findRaidLinks = () => {
  const piratesRaids = props.raids.filter((raid) => {
    return pirateHasRaid(raid)
  })

  return piratesRaids.map((raid) => {
    return raid._links.self.href;
  })
}

```

Then assign these to the defaultValue of raid select.

```js
// PirateEditForm.js

    <select multiple={true} name="raids" defaultValue = {findRaidLinks()}>
        {raidOptions}
    </select>
    <button type="submit">Save</button>
```

And lastly we will create a method to be triggered when the form is submitted.

```js
// PirateEditForm.js

const handleSubmit = (event) => {
  event.preventDefault();
}
```

And add this to the form element.

```js
// PirateEditForm.js

<form onSubmit={handleSubmit}> // MODIFIED
```

OK so when we trigger the onSubmit we need to build up a pirate object and pass to the callback.

We can build this as a standard JSON object using the name attributes of the form inputs as before. We will then call the handlePiratePost and pass the pirate up.

The multiple select will need to be filtered out to choose which ones are selected and map the values to a new array. We will need to get the values from the multiple select into a standard array.


```js
// PirateEditForm.js
function handleSubmit(event){
  event.preventDefault();
  const raids = [...event.target.raids.options].filter((option) => {
      return option.selected
    }).map((option) => {
      return option.value
    });

}
```

And finally create our updated Pirate object and pass to the callback.

```js
// PirateEditForm.js

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
```

So now we should be able to update our pirate using the form.

# Task
- Update a ship.
- Add a raid to a ship.

# Summary
- Learned how to edit a pirate and patch to the API.
