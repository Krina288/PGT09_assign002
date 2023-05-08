// import { Client } from 'pg';
const {Client} = require('pg')
const client = new Client();
client.connect();

debugger
client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log('Hello World!', err ? err.stack : res.rows[0].message) // Hello World!
    client.end()
})

// window.location.href = 'login/login.html'