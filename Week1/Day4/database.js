const { Client } = require('pg');

function getClient() {
    return new Client({
        host: my_postgres_container,
        user: admin,
        password: admin,
        database: hgop
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
            client.query('CREATE TABLE IF NOT EXISTS Item (ID SERIAL PRIMARY KEY, Name VARCHAR(32) NOT NULL, InsertDate TIMESTAMP NOT NULL);', (err) => {
                console.log('successfully connected to postgres!')
                client.end();            
            });
        });
    },
    // Should get the top 10 items sorted by inserteddate descending.
    // param onGet: on items get callback method.
    get: (onGet) => {
        var client = getClient();
        client.connect(() => {
            client.query('SELECT * FROM Item limit 10', (err) => {
                console.log('successfully connected to postgres!')
                client.end();            
            });
        });
    }
}

// give the postgres container a couple of seconds to setup.
setTimeout(initialize, 10000);
