# Vue CLI and Templates Introduction

**Lesson Duration: 30mins**

### Learning Objectives

- Understand how to use the Vue CLI to create a boilerplate app template
- Understand how to create a Vue Component

## Intro

Up until now we have been building our Vue apps with a relatively simple folder structure. What if we wanted to make more complex apps, however?  As we know, Vue is pretty unopinionated and we can build our Vue apps in various ways.

What if we wanted to integrate a testing framework or use a pre-processor like SASS or even write in TypeScript?  We'd really have to think about our folder structure and all of the dependencies that we require.

Luckily for us, Vue comes with a Command Line Interface which is the standard build tool for Vue applications which aims to reduce the amount of configuration the developer has to go through.

You can read a lot more in depth about this [here](https://cli.vuejs.org/guide/), but essentially the CLI offers different [builds](https://github.com/vuejs-templates) dependant on the developers requirements.  

> open builds link to show the different builds available.

The build we'll be using is `webpack-simple`.

**What does this install?**
- Vue
- Webpack
- Various loader files including:
  * vue-loader - _a loader for webpack that allows us to write components using a template/script/style format which is then transformed into a plain JavaScript module.  It also allows using other webpack loaders for each part of a Vue component_
  * css-loader - _Another loader for webpack that collects all references to CSS throughout the application and is compiled into one style tag within the html document_
- Babel - _a transpiler that takes newer language features that are not supported by all browsers and converts our code into a backwards compatible version JavaScript that we know is more widely supported_

## Hello World

Let's build a simple Hello World app to see exactly what this build gives us.

First we have to globally install the `Vue CLI` so that we can create our boilerplate builds from anywhere on our computers.

```bash
npm install -g @vue/cli @vue/cli-init
```

Then, create our app.

```bash
vue init webpack-simple hello-world
```

The installation will ask you to confirm a few credentials about the project.  Hitting `enter` on your keyboard will accept each suggestion.

Let's select `N` for using sass as we won't be using that just yet.

Follow the terminal commands to launch the project:

```bash
cd hello-world
npm install
npm run dev
```

This will launch the app in our browser on `http://localhost:8080`.

> The dev build hot reload doesn't clear the error in the terminal like we're used to.  Hot reload just rerenders the changed component rather than reloading the entire page. If in doubt look at the browser.  If the error still exists it will show here.

### Hows this working?

Navigate into the `src` folder and open `main.js`.  This is where the app is being kicked off from.  The only thing that's new here is the `render` function:

```js
//main.js
new Vue({
  el: '#app',
  render: h => h(App)
})
```

A new Vue instance has been created and is being placed in the root element of `#app`.

Now the confusing bit. `render: h => h(App)`.  This is just shorthand for:

```js
//main.js
new Vue({
  el: '#app',
  render: function(createElement) {  //UPDATED
    return createElement(App);
  }
})
```

Which can be shortened to

```js
//main.js
new Vue({
  el: '#app',
  render (createElement) {  //UPDATED
      return createElement(App);
  }
})
```

Which can also be shortened to

```js
//main.js
new Vue({
  el: '#app',
  render (h) {  //UPDATED
      return h(App);
  }
})
```

> Why h?  h is the common convention alias for createElement in the Vue ecosystem.  
Why?  It comes from the term "hyperscript", which is commonly used in many virtual-dom implementations. "Hyperscript" itself stands for "script that generates HTML structures" because HTML is the acronym for "hyper-text markup language".

Which is then shortened further using es6 fat arrow syntax to

```js
//main.js
new Vue({
  el: '#app',
  render: h => h(App)  //UPDATED
})
```

You'll notice we are also missing our `DOMContentLoaded` function.  This is because the build script `<script src="/dist/build.js"></script>` has been inserted in `index.html` at the bottom of body, ensuring it runs after the DOM content has loaded.

### Component Structure

Next, let's look at the `App` component which is being rendered.  You'll notice that the file type is a `.vue` file rather than a `.js` file.  It is the `vue-loader` dependency which is converting this back into a plain JavaScript module.

There are three main parts of each `.vue` file.

We have the `template` which is where we'll manage our component's HTML.

Within the `script` tags we have all of our JavaScript functionality.  `data` here is a function that returns an object.  By returning an object from our data function it ensures that any change made to the data remains local to that instance of the component. Note that this has changed slightly from the way we wrote our apps when we were working within a single component.

Between the `style` tag is where we'll write any css relevant to this component.

### Writing our own components

Now we know how the component structure works, let's write our own.

We'll start off by deleting everything from `App.vue`.  Before we write our own template/script/style structure lets install a very helpful atom package called `language-vue`.  This package gives us a shortcut to creating this structure.

```bash
apm install language-vue
```

> For this to take effect atom will have to be restarted.

Now when we are in a `.vue` file, when we type `template` you should see the `Vue Component` suggestion.  Selecting this will give us the boilerplate setup of a Vue component.

One thing to point out here other than the language attributes in template and style is that the style is `scoped`.  This means that for that component you can target any DOM element and it will only style that element within that component.

For example, if we write a piece of CSS like this:

```css
h3 {
  color: red
}
```

This will only affect any `h3` elements within this component - not the rest of the app! Be careful about this - ensure you organise your CSS properly.

Now, we can see that each component contains its own template (HTML), behaviour (JavaScript), and styling (CSS).

### Rendering Data

Let's give this component some data, within the object that we're exporting from our script tags.  We also need to give it the name of the component.

```js
// App.vue
<script>
export default {
  name: 'app',
  data(){  //NEW
    return {
      message: 'Hello World'
    }
  }
}
</script>
```

And then render that data within the template.

```html
<!-- App.vue -->
<template lang="html">
  <p>{{ message }}</p>
</template>
```

The browser will refresh on save, so save your file and navigate back to the browser.  You should now see hello world displayed.
