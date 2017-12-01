const express = require('express');
const redis = require('redis');
const database = require('./database');
const PORT = 3000;

var msg = "I Made IT!";
var app = express();

//This is the pagecounter!
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
//The Pagecounter ends here.


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
