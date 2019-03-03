# React Requests - Single Pirate from API

## Learning Objectives

- Understand how to make a call to our Pirate API using React to fetch a single Pirate.
- Understand how to use built in props in routes to pass Id as prop.


## Duration
1 hour.

# Intro

So we have been able to get all of the Pirates from our API but we may also want to display more details about a single pirate. Well we can define a route using the Pirates ID to display a single pirate and create a different component for additional pirate details.

# Routes.

> Use end point from all pirates lesson.

So we will need another route to get our single Pirate. This route will follow the pattern `/pirates/1`. Where 1 is the pirates `id`.

As the id will be different each time we will need to use params to get the ID from the url. The url params are accessible using the props passed into render. The pattern for this will be `/pirates/:id`.

Let's start by defining the route.

```js
// MainContainer.js
<Route exact path="/pirates" render={(props) =>{
      return <PirateList pirates={this.state.pirates}/>
    }}/>

<Route exact path="/pirates/:id" render={(props) =>{

}
}/> // ADDED
```

To get the id from the url we use `props.match.params.id`. This will bring back the id as a string.

```js
// MainContainer.js

<Route exact path="/pirates/:id" render={(props) =>{
  const id = props.match.params.id;
}
}/>
```

Next we need to find the pirate with that id. We already have all the pirates in our state so we will write a function above to find the pirate by id. We will then use this in our route to get the pirate.

```js
// MainContainer.js

componentDidMount(){
  // AS BEFORE
}

findPirateById(id){
  const pirate = this.state.pirates.find((pirate) => {
    return pirate.id === parseInt(id);
  });
  return pirate;
} // ADDED

render(){
  // AS BEFORE
  <Route exact path="/pirates" render={(props) =>{
          return <PirateList pirates={this.state.pirates}/>
        }}/>

  <Route exact path="/pirates/:id" render={(props) =>{
    const id = props.match.params.id;
    const pirate = this.findPirateById(id);
    }
  } />
}
```

And bind the new method in the constructor.

```js
// MainContainer.js

constructor(props){
  // AS BEFORE

  this.findPirateById = this.findPirateById.bind(this); // ADDED
}
```

When we get back a single pirate we probably want to show more details. Like maybe the list of raids that the pirate has been on.

We will create a new component called `PirateDetails` for this and pass the `Pirate` as props.

```js
// MainContainer.js

import PirateDetails from '../components/pirates/PirateDetails'

// AS BEFORE

<Route exact path="/pirates/:id" render={(props) =>{
        const pirate = this.findPirateById(props.match.params.id);
        return <PirateDetails pirate={pirate}/>
      }}/>

```

Now we will create the `PirateDetails` component.

```bash
touch src/components/pirates/PirateDetails.js

```

And code this up. We will bring in the basic Pirate component and render this then add details below. We will also make sure the passed in pirate isn't null.

```js
// PirateDetails.js

import React  from 'react';
import Pirate from "./Pirate"

const PirateDetails = (props) => {
  if (!props.pirate){
    return null
  }

  const raids = props.pirate.raids.map((raid, index) => {
    return <li key={index}>{raid.location}</li>
  })

  return (
    <div className = "component">
      <Pirate pirate = {props.pirate}/>
      <p>Raids:</p>
      <ul>
        {raids}
      </ul>
    </div>
  )
}

export default PirateDetails;

```

Now we need a Link somewhere to take us to that Route. We need this to go somewhere that we have access to the individual pirate and it's id.

In `Pirate` component we will wrap the Pirates name in a Link. We will change the `<p>` tag surrounding the pirates name to a `<Link>`.

We also need to define the url outside the return as string concatonaion won't work inside the Link tag.

We will then build the url to hit using the pirates id.

```js
// Pirate.js

const url = "/pirates/" + props.pirate.id;
return (
  <React.Fragment>
  <Link to = {url} className="name">
  {props.pirate.firstName} {props.pirate.lastName}
  </Link> //MODIFIED
  <p>Age: {props.pirate.age}</p>
  <p>Ship: {props.pirate.ship.name}</p>
  </React.Fragment>
)
}
```

And import Link at the top of the file

```js
// Pirate.js

import React from 'react';
import {Link} from 'react-router-dom';

```
Great so if we refresh our list click on the name of a pirate in our list it should now hit our new route in the container and render the full pirate details.

# Task
 - Get one Ship with a list of pirates.
 - Get one Raid with a list of pirates.

# Summary
- Learned how to use the data to fetch a pirates details.

#Next Lesson
- Delete a pirate
