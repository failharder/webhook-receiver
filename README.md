# stacklead-webhook-server

A barebones Node.js app using [Express 4](http://expressjs.com/) to receive [StackLead](https://stacklead.com) webhook responses and relay the data to various systems including email, a database and mixpanel.

## Configuring

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

This project has a basic express webserver for which handlers can be registered to receive webhook callbacks. The ./lib folder contains plugins that can be used to pass the StackLead data to various other systems like email, a database or mixpanel.

Settings should be configured in a local private copy of `config.js`.

```sh
$ cp config.js _config.js
$ ... edit _config.js to include passwords and settings
```

The _config.js file should look something like this:

```js
module.exports = {
  // for db storage module
  pg: {
    database: 'stacklead_heroku', // UPDATE to match local databse
    user: '', // UPDATE
    password: '', // UPDATE
    host: 'localhost',
    port: 5432,
    ssl: false
  },
  // for pushing data to mixpanel
  mixpanel: {
    token: '' // UPDATE
  },
  // for sending email from data
  email: {
    service: 'Gmail',
    auth: {
      user: 'gmail.user@gmail.com', // UPDATE
      pass: '' // UPDATE
    }
  }
};
```

## Running Locally

```sh
$ git clone git@github.com:stacklead/webhook-handler.git # or clone your own fork
$ cd webhook-handler
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
create a new databse
$ heroku addons:add heroku-postgresql:hobby-dev
$ heroku pg:wait
$ heroku config | grep HEROKU_POSTGRESQL
$ HEROKU_POSTGRESQL_RED_URL: postgres://user3123:passkja83kd8@ec2-117-21-174-214.compute-1.amazonaws.com:6212/db982398
promote the configured heroku pg url
$ heroku pg:promote HEROKU_POSTGRESQL_RED

push the app
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
