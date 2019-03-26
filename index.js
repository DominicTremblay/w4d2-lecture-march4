// pg module to interact with PostgresDB
const { Client } = require('pg');

// Options for connecting to the people database
const connectOptions = require('./connect_options');

// Creating a new client for connecting to the db
const client = new Client(connectOptions);

const createPeople = (firstName, lastName, cb) => {
  // Create an insert SQL query

  // Creating the text of the INSERT SQL query with parameters
  const insertQueryText = `INSERT INTO people (first_name, last_name) VALUES ($1, $2) RETURNING *`;

  // Run the query above
  client.query(insertQueryText, [firstName, lastName], (err, res) => {
    if (err) {
      console.log(`Error running query. ${err.stack}`);
    } else {
      cb(res);
      client.end();
    }
  });
};

// Run an SQL Query to get the list of all the people in DB in ascending order
const listPeople = cb => {
  const selectQueryText = 'SELECT * FROM people ORDER BY last_name, first_name';

  client.query(selectQueryText, (err, res) => {
    if (err) {
      console.log(`Error running query. ${err.stack}`);
    } else {
      cb(res.rows);
      client.end();
    }
  });
};

// Print list of people nicely
const printPeople = peopleArr => {
  console.log('Listing everybody in people DB...');
  console.log('---------------------------------');
  for (const people of peopleArr) {
    // we use people.first_name (underscore) because that's the name of the fields in the database
    console.log(
      `Id: ${people.id} First Name: ${people.first_name} Last Name: ${
        people.last_name
      }`
    );
  }
};

// Connecting to the db
client.connect(err => {
  // If error connecting to the db
  if (err) {
    console.log(`Connection error ${err.stack}`);
  } else {
    // Connection establsihed to the people db
    console.log(`Connected to ${client.database} database`);

    // Extract the command-line arguments
    const [node, path, command, firstName, lastName] = process.argv;
    // usual way to extract arguments
    // const args = process.argv.slice(2); //args is an array

    // validation to check if we received a command such as c or l
    if (!command) {
      // throw 'Syntax for running arguments: c|l [firstName lastName]';
      console.log('Syntax for running arguments: c|l [firstName lastName] ');
      process.exit(1);
    }

    // Action depending on the value of command
    switch (command.toLowerCase()) {
      // when command is c -> do the insert query
      case 'c':
        createPeople(firstName, lastName, function(result) {
          console.log(`${result.rowCount} rows have been added.`);
          console.log(result.rows[0]);
        });
        break;
      // whenc command is l -> select query
      case 'l':
        listPeople(printPeople);
        break;
      // command is neither c or l
      default:
        console.log('Unknow Command');
        console.log('Syntax for running arguments: c|l [firstName lastName] ');
        client.end();
        // exiting the program
        process.exit(1);
    }
  }
});
