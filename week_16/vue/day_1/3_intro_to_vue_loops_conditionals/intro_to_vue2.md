# Vue: Loops and Conditionals

**Duration: 90 minutes**

## Learning Objectives

- Working with Vue's devtools
- Working with Loops and Arrays in Vue
- Working with Conditionals in Vue
- Working with forms and Vue's `v-model` directive
- Working with Vue's `v-bind` directive

### Introduction

We're going to spend the next little while making something a bit more complex in Vue. But before we do, we need to look at our tooling.

One of the drawbacks of two-way binding is that it can be a little difficult to visualise the state of our program; the all-important `data` object.

To help with this, we're going to install [Vue's devtools for Chrome](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd).

Once these are installed, we need to change one small setting.

- Right click on the Vue icon in the toolbar, click "Manage Extensions"
- Scroll down and make sure that "Allow access to file URLs" is selected.

We'll see the benefits that this will bring shortly.

### Shopping List

We're going to work through a slightly more complex app in order to see some key Vue concepts. In this lesson, we'll make a shopping list that should:

- Display a list of items
- Allow the user to add new items
- Allow the user to mark items as "purchased"

> Hand out start point.

Let's start by displaying a simple list of items.

### The v-for directive

When we're planning our app in Vue, we can either start by thinking about the model (what data is stored) - or the view (what is displayed to the user.) Different people will approach problems in different ways, so experiment and find out what works best for you.

For now, we're going to start with the most basic approach of simply displaying a list of items, without worrying about marking items as complete, or adding items.

We know that we're going to need to track a list of items - an array - so let's start by declaring that on our model. Let's put a couple of items in there to start off.

```js
data: {
  items: ["Milk", "Cheese", "Beans"]
},
```

To display this list, we need to use the `v-for` directive. If we want one `<ul>` element, and multiple `<li>` elements, one for each item - we can do something like this:

```html
<ul>
  <li v-for="item in items">{{ item }}</li>
</ul>
```

If we run `npm run build`, then we should see the list! Let's talk through `v-for`.

`v-for` sets up a loop. Of course, we need to loop _over_ something, and in this case, we're looping over the `items` array in the data object. Each individual item can be referred to inside the moustaches as `{{ item }}`. (Because we said `"item in items"`).

We can also access the index of the loop - the position of the item of the array - and this will come in useful later.

Let's go ahead and add a form, to allow us to add new items to our list.

### Adding a form

Once again, we can think about our problem from the model side, or the view side. Let's think about what we want the user to see.

In this case, we probably want to display a text input field, and a button for the user to click. Let's start there.

```html
<ul>
  <li v-for="item in items">{{ item }}</li>
</ul>

<!-- ADDED  -->
<input type="text" />
<button>Save New Item</button>
```

Refreshing the page will show these elements, but they're not doing anything yet. Let's fix that.

### Introducing v-model

In order to capture input from the user, ideally, we want to know the value of the text input at all times. We want to be able to create a _two-way binding_ between the input element and a key / value pair on our `data` object.

We can achieve this by using the `v-model` directive. Let's change our code.

```html
<!-- CHANGED -->
<input type="text" v-model="newItem" />
```

If we refresh our browser page, we'll see an error here.

>  Property or method "newItem" is not defined on the instance but referenced during render.

To set up our binding, we need to declare the `newItem` key on our `data` object too. Since it should start off being empty, we'll give it the value of an empty string.

```js
data: {
  items: ["Milk", "Cheese", "Beans"],
  // ADDED
  newItem: ""
},
```

That's all we need to do! Now, whenever the value of the text input changes, the `newItem` variable will be automatically updated. And vice-versa, if we change the variable in our model, our view will change automatically.

If we refresh our browser, we can use devtools to watch our model dynamically update!

![Vue Devtools](./images/vue_devtools.png)

> Note: You might need to refresh your page or even restart your browser to see the relevant devtools pane!

Now that we know what the user is typing, we can simply finish the job.

> Task: 5-10 minutes

- create a method - `saveNewItem` - and wire it up to the button using `v-on:click`
- Inside this method, take the text entered by the user in `this.newItem`, and push it on to the array `this.items`
- After that, set `this.newItem` to be an empty string inside the method. What does this do? Why?

#### Solution:

```html
<input type="text" v-model="newItem" />
<!-- Changed  -->
<button v-on:click="saveNewItem">Save New Item</button>
```

```js
methods: {
  saveNewItem(){
    this.items.push(this.newItem);
    this.newItem = "";
  }
}
```

Answer: Setting `this.newItem = "";` clears the text box for the user, ready to enter the next item. This is because two-way binding works... both ways!

### Part 2 - Marking items as complete

In order to mark an item as "purchased", we need to think about the data we store for each individual item. We want to store:

- Its name (as a string, as before)
- Its purchased status (a boolean, `true` or `false`)

How can we achieve this? Instead of storing a string, we'll store an object instead. It might look like this:

```js
{ name: "Milk", purchased: true }
```

Let's amend our data object to reflect our new data structure.

```js
data: {
  // UPDATED
  items: [
    {name: "Milk", purchased: false},
    {name: "Cheese", purchased: true},
    {name: "Beans", purchased: false},
  ],
  newItem: ""
},
```

And now that each item is an object, we need to update our template to use the object's `name` property.

```html
<!-- UPDATED -->
<li v-for="item in items">{{ item.name }}</li>
```

If we refresh our page, we should at least have a list of items again.

Next, we need to display something to show the user that the item has been purchased. For now, let's just add a span element if the object's `purchased` field is true.

To do this, we need to use Vue's `v-if` directive.

```html
<li v-for="item in items">
  <span>{{ item.name }}</span>
  <span v-if="item.purchased">Purchased!</span>
</li>
```

`v-if` will output the span element **only** if `item.purchased` evaluates to `true`. Otherwise, it won't.

We have two tasks remaining.

- Allow the user to create new objects again, and
- Allow the user to mark items as "purchased"

Let's deal with the first one first, as it's broken at the moment.

### Creating objects

Let's look at the method we created earlier to add an item to the `this.items`.

```js
saveNewItem(){
  this.items.push(this.newItem);
  this.newItem = "";
}
```

At the moment, it's simply pushing a string onto the array. We need to change this, so that it pushes an object with a `name` and `purchased` status instead.

```js
saveNewItem(){
  // CHANGED
  this.items.push({
    name: this.newItem,
    purchased: false
  });
  this.newItem = "";
}
```

With this small change, we should be able to add items again.

### Allowing the user to mark items as purchased

Our last job is to let the user mark items as purchased.

Let's add a button to each element that _isn't_ currently marked as purchased. To do this, we can use a negated `v-if`. We only want to display the button if `purchased` is `false`.

```html
<li v-for="item in items">
  <span>{{ item.name }}</span>
  <span v-if="item.purchased">Purchased!</span>
  <!-- CHANGED -->
  <button v-if="!item.purchased">Purchase</button>
</li>
```

So if the item is purchased, we display a span element saying "Purchased!". Otherwise, we display a button allowing the user to purchase the item.

To finish off, we need to add a click handler to the button. To figure out which item should be marked as "purchased", we could grab the index of the loop, and pass it to our method!

```html
<li v-for="(item, index) in items">
  <span>{{ item.name }}</span>
  <span v-if="item.purchased"> - Purchased!</span>
  <button v-if="!item.purchased" v-on:click="buyItem(index)">Purchase</button>
</li>
```

> Task - 5 minutes: Write the method buyItem(index)

Solution:

```js
buyItem(index){
  this.items[index].purchased = true;
}
```

### Introducing v-bind

Let's say that we wanted to add a class to our `li` - `purchased` if the item has been purchased, `notPurchased` otherwise.

We can use a ternary to achieve this. Let's try it out:

```html
<li v-for="(item, index) in items" class="item.purchased ? 'purchased':'notPurchased'">
  <span>{{ item.name }}</span>
  <span v-if="item.purchased"> - Purchased!</span>
  <button v-if="!item.purchased" v-on:click="buyItem(index)">Purchase</button>
</li>
```

If we look in our devtools, this hasn't quite had the desired effect. Vue has done exactly as we've asked, and set the class as follows: `class="item.purchased ? 'purchased':'notPurchased'"`. How can we get around this?

We want to make `class` dynamic; to evaluate a JavaScript expression to decide how to set our HTML attribute.

When we want to use a variable or expression in an HTML attribute, we have to use the `v-bind` directive, as follows:

```html
<li v-for="(item, index) in items" v-bind:class="item.purchased ? 'purchased':'notPurchased'">
```

This is such a common pattern that you will often see a shorthand for `v-bind` - simply putting a `:` character before the attribute in question. We can simplify what we wrote before:

```html
<li v-for="(item, index) in items" :class="item.purchased ? 'purchased':'notPurchased'">
```

We will be using `v-bind` extensively throughout the course in various scenarios.

### Recap

What directive should we use if we want to conditionally output a piece of HTML?
<details>
<summary>Answer</summary>
`v-if`
</details>

What directive should we use if we want to loop through an array and output an HTML element for each item?
<details>
<summary>Answer</summary>
`v-for`
</details>

What is the purpose of `v-model`?
<details>
<summary>Answer</summary>
`v-model` allows us to set up a two-way binding; to capture the entered value from the form as it changes in the UI.

It also allows us to to change the variable in our JavaScript and see the UI dynamically change to represent the new value.
</details>

What is the purpose of `v-bind`?
<details>
<summary>Answer</summary>
`v-bind` allows us to dynamically set HTML attributes to a JavaScript variable, or the result of an expression.
</details>

### Conclusion

We've seen how to use `v-if`, `v-for` and `v-model` to construct a simple, dynamic JavaScript application using Vue.

Other form elements work in much the same way - for more information, see Vue's [form guide](https://vuejs.org/v2/guide/forms.html).
