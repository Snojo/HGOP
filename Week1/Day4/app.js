const express = require('express');
const redis = require('redis');
const database = require('./database');
var msg = "I Made IT!";
var app = express();
/*var client = database.createClient(6379, 'my_postgres_container', {
  retry_strategy: options => {
    return;
  },
});*/

app.get('/', (req, res) => {

  console.log(msg);
  res.send(msg);
  /*if (client.connected) {
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
  }*/
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
const users = []
// Should add an item to the database.
app.post('/items/:name', (req, res) => {
  const name = req.body
  const time = Date.now()
  
    pg.connect(conString, function (err, client, done) {
      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      client.query('INSERT INTO Item (name, age) VALUES ($1, $2);', [name.name, time], function (err, result) {
        done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
  
        if (err) {
          // pass the error to the express error handler
          return next(err)
        }
  
        res.send(200)
      })
    })
});

app.listen(3000);
