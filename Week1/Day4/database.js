const { Client } = require('pg');

function getClient() {
    return new Client({
        host: 'my_postgres_container',
        user: 'admin',
        password: 'admin',
        database: 'hgop'
    });
}

function initialize() {
    var client = getClient();
    client.connect(() => {
        client.query('CREATE TABLE IF NOT EXISTS Item (ID SERIAL PRIMARY KEY, Name VARCHAR(32) NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
            console.log('successfully connected to postgres!')
            client.end();            
        });
    });
}

// module.exports: if you are not familiar with NodeJS module.exports is similar to C#/C++ public access modifier.
// you use it to call functions or access properties from outside the file.  
module.exports = {
    // Should insert an item to the items table.
    // param name: item name.
    // param insertDate: item insertdate.
    // param onInsert: on item insert callback method.
    insert: (name, insertDate) => {
        var client = getClient();
        const text = 'INSERT INTO Item(Name, InsertDate) VALUES($1, $2) RETURNING *'
        const values = [name, insertDate]

        client.connect(() => {
            var query = client.query(text, values , (err, res) => {
                if (err) {
                    console.log(err.stack)
                  } else {
                    console.log(res.rows[0])
                    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
                  }
               // console.log('Data has been inserted')
                client.end(); 
                //client.query('INSERT INTO items(text, complete) values($1, $2)',[data.text, data.complete]);           
            });
        });
    },
    
    // Should get the top 10 items sorted by inserteddate descending.
    // param onGet: on items get callback method.
    get: (onGet) => {
        var client = getClient();
        client.connect(() => {
            var query = client.query('SELECT * FROM Item', (err,res) => {
                if (err) {
                    console.log(err.stack)
                  } else {
                    console.log(res.rows[0])
                    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
                  }
                //console.log('I managed to pull max 10 items from my database')
                client.end();  

    
            });
            query.on("row", function (row, result) {
                result.addRow(row);
            });
            
            query.on("end", function (result) {
                console.log(JSON.stringify(result.rows, null, "    "));
                client.end();
            });
        });
    }
}

// give the postgres container a couple of seconds to setup.
setTimeout(initialize, 10000);
