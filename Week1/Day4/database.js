const { Client } = require('pg');

function getClient() {
    return new Client({
        host: my_postgres_container,
        user: admin,
        password: admin,
        database: HGOP
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

// give the postgres container a couple of seconds to setup.
setTimeout(initialize, 10000);
