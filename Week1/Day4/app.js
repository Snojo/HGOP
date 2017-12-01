const express = require('express');
//const redis = require('redis');
const database = require('./database');
const PORT = 3000;

var msg = "I Made IT!";
var app = express();
/*var client = database.createClient(6379, 'my_postgres_container', {
  retry_strategy: options => {
    return;
  },
});*/

// TODO: NEED TO CREATE A CONNECTION STRING.... I THINK

app.get('/', (req, res) => res.status(200).send('hello wooorld!!!'));


// Should return an array of 10 item names.
app.get('/items', (req, res) => {
  database.get();
  res.status(200).send("Is this even working?");
  // todo
});

// Should add an item to the database.
app.post('/items/:name', (req, res) => {
  var name = req.params.name;
  var date = new Date();


  database.insert(name, date);
});

//app.listen(3000);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
