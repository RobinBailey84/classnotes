# Vue Lifecycle and Requests

**Lesson Duration: 90 minutes**

### Learning Objectives

- Be able to navigate JSON data structures.
- To understand Vue's lifecycle hooks.
- To understand Vue's "v-bind" directive.
- Be able to integrate an API request into our Vue instances.

## Intro

Now that we've looked at bringing data into our apps from external APIs, let's see how we can integrate that with what we've learned about Vue so far by building an app. As we do this, we'll also see how we can let Vue do some of the heavy lifting for us by hooking into its lifecycle, and how we can use our variables in our html with Vue's `v-bind` directive.

## What are we building?

We're going to build a single page application that lets us select information about any country in the world, pick the ones we like the look of and add them to a list of places we want to visit. We'll do this with the RestCountries API we saw earlier today. The RestCountries API is great for new developers because it gives us a whole bunch of intuitive, well-documented endpoints that allow us to work with some well-constructed, easy-to-use data objects.

> Instructor note: Hand out start point

The first thing we should do is bootstrap our Vue application inside an event listener.

```js
document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: "#app"
  });
});
```

Next, we should write a method that is going to retrieve all our data for us. Let's add a method to our `app.js` that will use the `Fetch` API to get our array of countries, and once it's retrieved it, we'll convert it to JSON and then `console.log` it out.

> Task (5 minutes) write a method that will fetch all the countries from "https://restcountries.eu/rest/v2/all" and log the response out.

```js
//app.js

new Vue({
  el: "#app",
  methods: { //NEW
    getCountries: function(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => console.log(countries))
    }
  } //END NEW
})
```

Just now nothing will happen, because we haven't called upon this method. So let's make a button in our `index.html` that we can use to kick our `getCountries` method off.

```html
<!-- index.html -->
<div id="app">
  <button v-on:click = "getCountries"> GET COUNTRIES </button>
</div>
```

So now if we save, refresh and then click this button, we should see that we have an array of 250 countries being logged out. But what should we do with all this information? We should probably hold on to it in our Vue instance's `data` object for safekeeping. So let's do that:

```js
//app.js

new Vue({
  el: "#app",
  data: { //NEW
    countries: []
  },
  methods: {
    getCountries: function(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => this.countries = countries) //MODIFIED
    }
  }
})

```

Now, when we click our button that fetches all the countries, we don't see anything logging out, but if we check our Vue DevTools, we'll see them sitting quite happily in our Vue instance's `data` object. Once it's there, with Vue's declarative rendering we should be able to write something in our `index.html` that will display all that country in information in the browser.

> Task: 5 minutes: Display every country's name and population in the browser.

### Solution

```html
<button v-on:click = "getCountries"> GET COUNTRIES </button>

<div v-for:"country in countries">
  <h1>{{country.name}}<h2>
  <h2>Population: {{country.population}}</h2>
</div>
```

## V-bind

So now we have a list of all our countries with their name and population. If we look in our Vue DevTools we can see that every country object has a `flag` property, with a link to a flag image. What could we do if we wanted to display that flag? Our first instinct might be to do something like this:

```html
<button v-on:click = "getCountries"> GET COUNTRIES </button>

<div v-for:"country in countries">
  <h1>{{country.name}}<h2>
  <h2>Population: {{country.population}}</h2>
  <img alt = {{country.name}} src = {{country.flag}} />
</div>
```

But if we refresh our browser, things don't seem to be working. In our console however, there is a fairly explicit error:

```
- alt="{{country.name}}": Interpolation inside attributes has been removed. Use v-bind or the colon shorthand instead. For example, instead of <div id="{{ val }}">, use <div :id="val">
```

This is saying that Vue doesn't allow us to interpolate our variables inside our html attributes using the `{{moustache syntax}}` that we've become accustomed to. Instead, what we should be doing is using `v-bind`, another vue directive that effectively allows us to do what we're trying to do. Just as `v-model` can be referred to as _two-way binding_, `v-bind` is often referred to as _one-way binding_. Let's fix that now:

```html

  <button v-on:click = "getCountries"> GET COUNTRIES </button>

  <div v-for:"country in countries">
    <h1>{{country.name}}<h2>
    <h2>Population: {{country.population}}</h2>
    <img v-bind:alt="country.name" v-bind:src="country.flag" />
  </div>

```

`v-bind`ing is so commonplace, that there's an even neater shorthand we can use - appending a colon to the start of whatever attribute we want to bind. Like so:

```html

    <img :alt="country.name" :src="country.flag" />

```

So what do we have now? An app that will display a list of countries once we click a button. This could still be improved, however - we probably don't want users to have to click a button to kick off the function that gets all our data. Wouldn't it be better if there was some way that the `getCountries` method ran without us having to do anything? There is! Let's look at that now.

## Lifecycle Hooks

From [the docs](https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks):

_Each Vue instance goes through a series of initialization steps when it’s created - for example, it needs to set up data observation, compile the template, mount the instance to the DOM, and update the DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the opportunity to add their own code at specific stages._

In a nutshell, this is saying that our Vue instance runs a handful of specifically named methods throughout its existence, and affords us the opportunity to add our code to them. `Lifecycle hooks` you may see documented include `created`, `updated`, and `destroyed`, but the one we're going to look at for the time being is `mounted`. `mounted` is a method that runs once our DOM is ready and available to be manipulated, so we're using it here much in the same way that we've been using `DOMContentLoaded`. Let's see if we can hook into it just now:

```js

new Vue({
  el: "#app",
  data: {
    countries: []
  },
  mounted(){ //NEW
    console.log("Hello from the mounted lifecycle hook!");
  },
  methods: {
    getCountries: function(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => this.countries = countries)
    }
  }
})

```

And if we look in the console now, we can see that this method is executing every time our script reloads. That means could move our code for fetching the countries data into `mounted()` and do away with this unintuitive button.

```js
new Vue({
  el: "#app",
  data: {
    countries: []
  },
  mounted(){
    getCountries() //MODIFIED
  },
  methods: {
    getCountries: function(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => this.countries = countries)
    }
  }
})
```

```html
<button v-on:click="getCountries">GET COUNTRIES</button> <!--REMOVE THIS-->
```

Looking back at the spec that we set ourselves at the start of this lesson, we did say that we were going to select information about any country in the world. Just now we're displaying all the countries at any given time. Let's amend our approach so that the user is able to view one country at a time. How might we do this?

> Instructor note: ASK THE CLASS HOW MIGHT WE DO THIS?

Ideally, we'd like to make a selector that when we change it gives us the index of the chosen country within our countries array, which we can then use to access all this country's information and display it how we see fit in our HTML.  

## Selecting an Individual Country to Display

We're not obligated to display all the country data we've fetched from the RestCountries API - we can do whatever we want to it. Let's use it now to create options for a selector that will allow the user to pick one country at a time.

```html

<!-- Remove div rendering all countries and replace -->
<label for="country_select">Select a Country:</label>
<select id="country_select">
  <option disabled value="">Select a country</option>
  <option v-for="country in countries">{{country.name}}</option>
</select>

```

Instead of 250 divs, we should now have a select with an option for every country in our data. Ideally, we'd like to be able to grab the index of the selected country and store it in our Vue instance's `data` for future use. We can do that with our old friend the `v-model`! Let's set it to an empty string for the time being - this will make having a default disabled option viable.

```js
new Vue({
  el: "#app",
  data: {
    countries: [],
    selectedCountryIndex: '' //NEW
    // ...
  }
});
```

```html
<label for="country_select">Select a Country:</label>
<select id = "country_select" v-model="selectedCountryIndex"> <!-- MODIFIED -->
  <option disabled value="">Select a country</option>
  <option v-for="country in countries">{{country.name}}</option>
</select>
```

Now when the user changes our selector, in our Vue DevTools we can see that the `selectedCountryIndex` is changing to... the country's name. Which isn't quite what we wanted, but we know our `v-model` is working, and that's a start.

So how do we get the index? Handily, a `v-for` not only gives access to the current iteration of our array's loop, but also the index of where it exists in the array.

```html

<label for="country_select">Select a Country:</label>
<select id="country_select" v-model="selectedCountryIndex">
  <option disabled value="">Select a country</option>
  <option v-for="(country, index) in countries">{{country.name}}</option> <!-- NEW -->
</select>

```

And now we have that index, let's ensure that when an option is selected, that index will be value of that option, and therefore the value of `selectedCountryIndex`. We can do that by calling upon our new tool - `v-binding`!

```html

<label for="country_select">Select a Country:</label>
<select id="country_select" v-model="selectedCountryIndex">
  <option disabled value="">Select a country</option>
  <option v-for="(country, index) in countries" :value="index">{{country.name}}</option> <!-- MODIFIED -->
</select>

```

So now when we look at our Vue DevTools, when we change our selector, we should see our `selectedCountryIndex` change as well. Our next step is to ensure that whenever the selector is changed, we use that index to access the selected country so we can display it.

> Task (10 minutes) - Use the `selectedCountryIndex` to display a selected country when the selector is changed.

### Solution

```js
new Vue({
  el: "#app",
  data: {
    countries: [],
    selectedCountryIndex: '',
    selectedCountry: null //NEW
  },
  mounted(){
    this.getCountries()
  },
  methods: {
    getCountries: function(){
      fetch("https://restcountries.eu/rest/v2/all")
      .then(res => res.json())
      .then(countries => this.countries = countries)
    },
    countrySelect: function(){ //NEW
      this.selectedCountry = this.countries[this.selectedCountryIndex];
    }
    // ...
  }
});
```

```html
<label for="country_select">Select a Country:</label>
<select id="country_select" v-model="selectedCountryIndex" v-on:change="countrySelect"> <!-- NEW -->
  <option disabled value="">Select a country</option>
  <option v-for="(country, index) in countries" :value="index">{{country.name}}</option>
</select>

<div id = "selected_country" v-if="selectedCountry"> <!-- NEW -->
  <h1> {{selectedCountry.name}} </h1>
  <h2> Population: {{selectedCountry.population}} </h2>
  <img :src="selectedCountry.flag" />
</div>
```

## Displaying a list of favourite countries

The last thing we aimed to do with this app was to let the user pick places they wanted to visit and then display that list in the browser. First let's add somewhere in our Vue instance's `data` for these countries to be stored.

```js

new Vue({
  el: "#app",
  data: {
    countries: [],
    favouriteCountries: [], //NEW
    selectedCountryIndex: "",
    selectedCountry: null
  },
  // ...
});
```

And let's add a button to our html that will allow the user to add the selected country to our favourite countries.

```html

<div id = "selected_country" v-if="selected_country">
  <h1> {{selected_country.name}} </h1>
  <h2> Population: {{selected_country.population}} </h2>
  <img :src="selected_country.flag" />
  <button>Add Country</button> <!-- NEW -->
</div>

```

All that remains is for us to write a method that this button will execute when clicked that adds the `selectedCountry` to our `favouriteCountries`, and some html to display our `favouriteCountries`.

### Task (10 minutes)

Finish the app!

### Solution

```js
// IN METHODS
addToFavourites: function(){
  this.favouriteCountries.push(this.selectedCountry)
}
```

```html

<div id="selected_country" v-if="selectedCountry">
  <h1> {{selectedCountry.name}} </h1>
  <h2> Population: {{selectedCountry.population}} </h2>
  <img :src="selectedCountry.flag" />
  <button v-on:click="addToFavourites"> Add Country</button> <!-- MODIFIED -->
</div>

<div id="favourite_countries"> <!-- NEW -->
  <h2>Favourite Countries</h2>
  <ul>
    <li v-for="country in favouriteCountries">{{country.name}}</li>
  </ul>
</div>

```

## Conclusion

We've looked at how we can integrate external data into our Vue apps, and how we can make things easier for ourselves by relying on Vue's lifecycle hooks to execute our code without us having to explicitly call upon it. We've also seen how we can use our variables in html attributes via `v-binding`, and ultimately equipped ourselves with useful tools that will benefit us as our applications grow in scope.
