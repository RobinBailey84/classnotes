# Deploying a Mongo/Express/Webpack App to Heroku

### Learning Objectives
- Know what Heroku is
- Know what mlab is
- Be able to deploy an app built with mongo, express and webpack

## Introduction

Deploying our applications to the internet makes them available to users via a URL. Heroku is a cloud platform that offers free hosting and has an add-on called Mlab that enables us to deploy MongoDB databases. Heroku also allows us to deploy and manage applications using git, meaning we can integrate deployment with our existing git workflow.

## Database Setup

We will start by deploying the MongoDB database.

### Mlab

Mlab is a cloud database that hosts mongo databases. It runs on cloud providers Amazon, Google and Microsoft Azure and offers a free plan type which comes with 0.5GB of storage.

1. Create mlab account and verify account through email link https://mlab.com/signup/
2. Create new MongoDB Deployment, select amazon web services as the provider, click continue and then select Europe as the region then continue.
3. Give your database a name, continue and then complete order. The database may take a min or two to set up.
4. Click into database, select users and add a database user. Enter a username and password and click create.
5. Add a collection.

### Seeds File

First, create a new branch.

```bash
git checkout -b Heroku
```

Your seeds file should only contain an array of objects. For example:

```js
//seeds.js

[
 {
   name: object1,
   description: object1 description
 },
 {
   name: object2,
   description: object description
 }
]
```

In mlab, within your db look for the details under `To connect using the mongo shell`. These are the details you'll need for the following command.

In your terminal type `mongoimport -h ds******.mlab.com:***** -d dbname -c collectionname -u dbusername -p dbuserpassword --file eg.server/db/seeds.js --jsonArray`

You should see "imported x amount of documents" in the terminal. You can check this in mlab by refreshing the page and seeing that the collection now has documents in it.

## Server SetUp

Create url and port variables to handle local and deployed apps. If you want to merge this branch into master you should extract the username and password out into another file that is gitignored and require them in here.

In mlab, within your db look for the details under `To connect using a driver via the standard MongoDB URI `. These are the details you will use for your url variable.

```js
//server.js

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json())

let url = 'mongodb://<dbuser>:<dbpassword>@ds******.mlab.com:*****/dbname'|| 'mongodb://localhost:27017'; //ADDED
let port = process.env.PORT || 3000; //ADDED

MongoClient.connect(url, (err, client) => { //UPDATED
  if(err){
    console.log(err);
  }

  const db = client.db('mlabdbname'); //UPDATED

  app.listen(port, function(){ //UPDATED
    console.log('listening on ', port); //UPDATED
  })

});

```

It is important to make sure that the exact database name you created in mlab is passed in to `client.db()`.

Make sure there is no reference to localhost anywhere in your project.  If your server file is using something like `app.use(/api/example)`  your client should be requesting from `/api/example`.

## Remaining Setup

Create a Procfile in your route directory.  This tells Heroku how to start your app.

```bash
touch Procfile
```

Inside Procfile add the following:
```
web: npm start
```

Remove bundle.js from your gitignore and run `npm run build` so that your public folder has a js folder with bundle.js inside it.

###

Heroku is a cloud platfrom for hosting web apps.

Create a Heroku account if you don't already have one. https://www.heroku.com/

If you have not deployed to Heroku before you will need to install the Heroku cli.

```bash
brew install heroku/brew/heroku
```

Once that has installed, connect your branch to Heroku by logging in through the command line.

```bash
heroku login
```

The command `heroku create` will create your app.  If you don't add an app name after `heroku create` Heroku will generate one for you so make sure you add an appname as this will form part of the app's url.

```bash
heroku create yourappname
```

Now you need to set your mlab configuration up with Heroku.

```bash
heroku config:set MONGOLAB_URI=mongodb://<dbuser>:<dbpassword>@ds12345.mlab.com:12345/dbname
```

To deploy to Heroku you now need to `git add`, `commit` then `push` to the Heroku remote branch.

```bash
gaa
gcmsg 'configured for Heroku'
git push heroku yourlocalbranch:master

heroku open
```

You should now be able so see your app live.  If you experience any errors you can check these in the browsers console or check Heroku's logs by typing `heroku logs --tail` in the terminal.
