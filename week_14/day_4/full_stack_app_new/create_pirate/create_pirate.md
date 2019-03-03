# React Requests - Create Pirate

## Learning Objectives

- Understand how to create a new pirate in our API

## Duration
1 hour.

# Intro

So we have been able to get all of the Pirates from our API but we may also want to create a pirate. Well we can define a route in our `MainContainer.js` to take us to a form and then `POST` to the API when that form is submitted.

# Show form route.

> Use end point from delete lesson.

Let' start off by creating the route to our form in react and also add a link to the NavBar.

The route we will define will be `/pirates/new`. As this closely matches `/pirates/:id` we will put this above the show one pirate route and our Switch will handle the details. Otherwise it will hit `/pirates/:id` first and assume that `new` is the id.

We will have this route render a `PirateFormContainer` which we will import at the top.

When we are creating this form we will need to give the user a list of ships that already exist to choose from. Remember that as there is a one to many relationship between pirates and ships we need to give a new pirate a ship.

We have the list of ships on our state so we will pass this to the form.

```js
// MainContainer.js

import PirateFormContainer from './pirates/PirateFormContainer';

// AS BEFORE
    <Route exact path="/pirates" render={(props) =>{
      return <PirateList pirates={this.state.pirates} onPirateSelect={this.findPirateById}/>
    }}/>

    <Route exact path = '/pirates/new' render={(props) =>{
      return <PirateFormContainer ships = {this.state.ships}/>
    }}/> // ADDED
```

And add a link in our `NavBar`

```js
//NavBar.js

<ul>
  <li className="navLink">
    <Link to="/pirates">Pirates</Link>
  </li>
  <li className="navLink">
    <Link to="/pirates/new">Create Pirate</Link> // ADDED
  </li>
  <li className="navLink">
    <Link to="/ships">Ships</Link>
  </li>
  <li className="navLink">
    <Link to="/raids" >Raids</Link>
  </li>

</ul>

```

## Pirate Form Container

Let's create our container that will handle all of the logic.

```bash
mkdir src.containers/pirates
touch src/containers/pirates/PirateFormContainer.js

```

And create this as a new class.

```js
// App.js
import React, {Component} from 'react';

class PirateFormContainer extends Component {
  constructor(props){
    super(props);
  }
}

export default PirateFormContainer;
```

## POST method

We want to post to the API so we will need to write a POST method in our request helper. This will take in a url and a payload to save. Much like delete we will define the method, headers and also a body to save. If you remember when we posted using insomnia our body looked something like this:

```json
{
  "firstName": "Mr",
  "lastName": "Gibbs",
  "age": 45,
  "ship": "http://localhost:8080/ships/2"
}
```

So this is what will need to be passed in as the payload. When we send the payload we need to use `JSON.stringify()` to convert the JSON object to a string to allow the data to be sent to the API.

```js
// request.js

post(url, payload){
  return fetch(url, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  })
}
```

Next we will create a method in the form container to call the post.

The url to post to the api will be `/api/pirates`. After the post we will redirect back to our list of pirates. Don't forget to bind this in the constructor.

We need to import `Request`.

```js
// PirateFormContainer.js
import React, {Component} from 'react';
import Request from '../../helpers/request';
```

```js
// PirateFormContainer.js

constructor(props){
  super(props);
}


handlePiratePost(pirate){
  const request = new Request();
  request.post('/api/pirates', pirate).then(() => {
    window.location = '/pirates'
  })
}
```

We also need to bind the handlePiratePost.

```js
// PirateFormContainer.js

constructor(props){
  super(props);
  this.handlePiratePost = this.handlePiratePost.bind(this);
}
```

Lastly we will render a form component and pass in the ships and the handler method.  as props.

```js
// PirateFormContainer.js
render(){

  return <PirateForm ships = {this.props.ships} handlePiratePost= {this.handlePiratePost} />

}
```

And import this in the form container

```js
// PirateFormContainer.js
import React, {Component} from 'react';
import Request from '../../helpers/request';
import PirateForm from '../../components/pirates/PirateForm'; // ADDED
```

OK so now let's create the form component.

```bash
touch src/components/pirates/PirateForm.js
```

And let's set this up again making sure the passed in pirate isn't null.

```js
// PirateForm.js
import React from 'react';

const PirateForm = (props) => {

  return (

  )
}

export default PirateForm;

```

Now we can create a form and create inputs for the name and age first of all.

```js
// PirateForm.js

return (
      <div>
        <form>
          <input type="text" placeholder="First Name" name="firstName"/>
          <input type="text" placeholder="Last Name" name="lastName"/>
          <input type="number" placeholder="Age" name="age"/>

          <button type="submit">Save</button>
        </form>
      </div>
    )
```

Ok so we probably want a drop down for the ships. We will use the ships name to display in the drop down but remember that the value will need to be the link to the ship.

We will create the array of `options` to go into the select and then the select itself.

```js
// PirateForm.js

const options = props.ships.map((ship, index) => {
  return <option key={index} value={ship._links.self.href}>{ship.name}</option>
}) // ADDED

  return (
    <div>
      <form>
        <input type="text" placeholder="First Name" name="firstName"/>
        <input type="text" placeholder="Last Name" name="lastName"/>
        <input type="number" placeholder="Age" name="age"/>
        <select name="ship">
          {options} // ADDED
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  )
```

And lastly we will create a method to be triggered when the form is submitted.

```js
// PirateForm.js
const handleSubmit = (event) => {
  event.preventDefault();
}
```

And add this to the form element.

```js
// PirateForm.js

<form onSubmit={handleSubmit}> // MODIFIED
```

OK so when we trigger the onSubmit we need to build up a pirate object and pass to the callback.

We can build this as a standard JSON object using the name attributes of the form inputs as before. We will then call the handlePiratePost and pass the pirate up.

```js
// PirateForm.js
function handleSubmit(event){
  event.preventDefault();
  const pirate = {
    "firstName": event.target.firstName.value,
    "lastName": event.target.lastName.value,
    "age": event.target.age.value,
    "ship": event.target.ship.value
  }
  props.handlePiratePost(pirate);
}
```

So now we should be able to create our pirate using the form.

# Task
- Add a ship.
- Add a pirate to a new ship.

# Summary
- Learned how to create a pirate and post to the API.

# Next Lesson
- Edit a pirate.
