# Intro to Vue

**Duration: 45 minutes**

## Learning Objectives

- Understand why the need for frameworks has arisen
- Be able to configure and install Vue, with Webpack
- Set up a single page Vue app
- Use events and methods in our apps

### Introduction

We've seen that manipulating the DOM with JavaScript has a few issues.

- It is repetitive
- It is mistake-prone
- It is verbose and difficult to manage

In addition, it is very challenging to architect larger JavaScript applications, while making sure they are structured properly.

In the last couple of years, a number of frameworks have arisen to solve this problem. React (maintained by Facebook) and Angular (largely maintained by Google) are two of the key players, and the third is [VueJS](https://vuejs.org/).

Vue is a popular, community-driven framework whose job it is to give structure to front-end JavaScript applications. It is an unopinionated library that provides a number of different ways of doing things. This week, we'll look at two approaches; one where our app lives in a single file, and one where we split our app into multiple components.

It's also easy to learn, and fun! To use it, we'll start by walking through an initial setup.

> Hand out start point

### Installing and Configuring Vue

First, let's install and configure Vue. We can do this with NPM, as normal.

```bash
npm install vue
```

Secondly, in order to bring in Vue, we're going to have to add to our Webpack configuration.

```js
const config = {
  entry: `${__dirname}/src/app.js`,
  output: {
    path: `${__dirname}/public/js/`,
    filename: 'bundle.js'
  },
  // ADDED
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  // END OF ADDED
  mode: 'development'
};

module.exports = config;
```

This section tells Webpack to use a version of Vue which is an EcmaScript module. (Which means we can `import` it!)

We should be able to run `npm run build` now, and open the `index.html` file in our browsers. We're ready to begin!

### Setting up Vue

Let's open up our `index.html` file and take a look. What can we see?

```html
<body>
  <div id="app">
  </div>
</body>
```

You should be pretty comfortable with this file; there's really nothing unusual about it, except that we're starting with a `<div id="app">` in place. This is the div that Vue will use to hook into our HTML, to display what the user should see. We can leave this alone for the time being.

Let's look at our `app.js` file now. In order to set up a Vue application, we need to set up an event listener first, so that we can be sure the DOM has loaded. (Even although we don't have to worry about DOM manipulation directly, this is what Vue is doing behind the scenes.)

```js
document.addEventListener('DOMContentLoaded', () => {

});
```

Next up, we need to create a new instance of a Vue application. And to do that, we have to import Vue.

```js
// Added
import Vue from 'vue';

document.addEventListener('DOMContentLoaded', () => {
  // Added
  new Vue();
});
```

This `Vue` function can take in an object with several keys. Let's add the first key we will need, `el`. The `el` key tells Vue where the root element exists; the element where our Vue app will live. Since we want it to live in the `#app` DOM element, that's going to be the value of this key.

```js
new Vue({
  el: "#app"
});
```

`el` takes a CSS selector, so we're looking for the element with ID `app`.

Next, let's set up a really simple "Hello World" example. To do this, we need to understand some of the basics of Vue.

### Two Way Binding

One of the key features of Vue is its use of "Two Way Binding". Let's consider a software application that has two parts:

1. Our view; the part the user sees.
2. Our model, where any logic is carried out.

Two way binding sets up a relationship between the two, so that if the model changes, the view automatically updates! (And vice-versa, changes to the view will be updated to the model. For example, within a form.)

This is _really_ helpful for us - it means that we can work in JavaScript to update our model, and the result will be displayed to the user!

Let's see how to set this up, going back to our app.

### Setting up Two Way Binding

It's really easy to set up two way binding in Vue. Firstly, we're going to declare a dynamically bound variable in our `index.html` file.

```html
<div id="app">
  {{ greeting }}
</div>
```

Next, we're going to set up the variable on our Vue instance. We need to declare a key called `data`, and set it to be an object.

```js
new Vue({
  el: "#app",
  // ADDED
  data: {

  }
});
```

Within this `data` object, we can set any variables we want to use in the DOM:

```js
new Vue({
  el: "#app",
  data: {
    greeting: "Hello World!"
  }
});
```

Now, if we refresh the page, we should see our greeting. That's a lot of work to set up a "Hello World". What have we gained here?

Any changes we make to the `greeting` variable will immediately be reflected in our app! To see the power of this, let's look at events.

### Capturing your first event

So far, our `index.html` file is pretty straightforward, just consisting of a single dynamically bound variable. Our Vue templates can also consist of HTML, as normal. Let's adjust our HTML to demonstrate.

```html
<div id="app">
  <h1>{{ greeting }}</h1>
  <button>Change Greeting</button>
</div>
```

So we've added a few HTML elements; a heading, and a button. Our next task is to make something happen when we click on the button. We know how to do this with plain JavaScript - we can use `addEventListener` to hook into certain events. In Vue, it's arguably easier. Let's add an event listener to the button directly.

```html
<div id="app">
  <h1>{{ greeting }}</h1>
  <button v-on:click="updateGreeting">Change Greeting</button>
</div>
```

`v-on:` is a Vue _directive_. There are lots of directives, but `v-on:` lets us listen for events. The second part tells view that we're listening for a `click` event, and this can be any of the events we've seen so far - `click`, `submit`, `change` etc.

There are lots of other directives, but for now, let's focus on events.

We've said that when the button is clicked, we should execute a function called `updateGreeting`. Where should this be written?

We need to declare any methods we want to use on our Vue object, as follows:

- Add an object to your Vue instance, with the key of `methods`
- write any methods you need here as keys / values

```js
new Vue({
  el: "#app",
  data: {
    greeting: "Hello World!"
  },
  // Added
  methods: {
    updateGreeting: function() {
      this.greeting = "Changed!";
    }
  }
  // END ADDED
});
```

Notice that within these methods, we need to refer to `this.variableName` to get access to the `greeting` variable. So `this.greeting`, for example.

We can try this out - refresh your browser window and click the button!

#### Arguments

We can also pass arguments to the methods we call.

```html
<button v-on:click="updateGreeting('John')">Change Greeting</button>
```

We have to watch out for single / double quotes here! Finally, let's update our method.

```js
methods: {
  updateGreeting: function(name) {
    this.greeting = "Hello, " + name;
  }
}
```

So we've fulfilled the promise of two-way binding: _when we change the model variable, our view automatically updates_. Whatever the `greeting` key contains, that's what will be displayed in the template.

### Conclusion

Using Vue allows us to focus on the _logic_ of our application, rather than on boilerplate DOM manipulation. Through the power of two-way binding, we can think in terms of our JavaScript, allowing our views to take care of themselves.

Next, we'll take a look at a few more directives, and see how can work with arrays, loops, and conditionals.
