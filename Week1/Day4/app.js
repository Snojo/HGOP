const express = require('express');
const redis = require('redis');
const database = require(',/database');

var app = express();
var client = redis.createClient(6379, 'my_redis_container', {
  retry_strategy: options => {
    return;
  },
});

app.get('/', (req, res) => {
  if (client.connected) {
    client.incr('page_load_count', (error, reply) => {
      var msg = 'Connected to redis, you are awesome :D' + 'Page loaded ' + reply + ' times!';
      res.statusCode = 200;
      res.send(msg);
      return;
    });
  } else {
    var msg = "Failed to connect to redis :'(";
    res.statusCode = 500;
    res.send(msg);
  }
});

// Should return an array of 10 item names.
app.get('/items', (req, res) => {
  //database.get();
  // todo
  const results = [];
  // Get a Postgres client from the connection pool
  database.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Item ORDER BY Item DESC limit 10;');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });

});

// Should add an item to the database.
app.post('/items/:name', (req, res) => {
  var name = req.params.name;
  //database.insert();
  // todo
  const results = [];
  // Grab data from http request
  const data = {name: req.params.name, insertdate: Date.now()};
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO Item(name, insertdate) values($1, $2)',
    [data.text, data.complete]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM Item ORDER BY Item DESC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });

});

app.listen(3000);
