const { Client } = require('pg');

function getClient() {
    return new Client({
        host: my_postgres_container,
        user: admin,
        password: admin,
        database: my_postgres_container
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
    insert: (name, insertDate, onInsert) => {
        var client = getClient();
        client.connect(() => {
            client.query('INSERT INTO Item VALUES(Name, InsertDate);', (err) => {
                console.log('Data has been inserted')
                client.end();            
            });
        });
    },
    // Should get the top 10 items sorted by inserteddate descending.
    // param onGet: on items get callback method.
    get: (onGet) => {
        var client = getClient();
        client.connect(() => {
            client.query('SELECT * FROM Item order by Item desc limit 10;', (err) => {
                console.log('I managed to pull max 10 items from my database')
                client.end();            
            });
        });
    }
}

// give the postgres container a couple of seconds to setup.
setTimeout(initialize, 10000);
