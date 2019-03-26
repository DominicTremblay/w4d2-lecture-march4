# W4D2 - Lecture

## Run the app

- clone this repo
- npm install
- node index.js c|l [firstName lastName]

## Using pg

## config

- install pg

`npm install --save pg`

- create a file **connect_options** and export an object containing database name, user, password

- make sure `connect_options.js` is in `.gitignore`

- require pg and require connected options

```js
const { Client } = require('pg');
const connectOptions = require('./connect_options');
```

- look at the documentation to do the client.connect

[Connecting](https://node-postgres.com/features/connecting)
[pg.Client](https://node-postgres.com/api/client)

## Queries

Look at the documentation about queries:

[Queries](https://node-postgres.com/features/queries)
