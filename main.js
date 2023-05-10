// import { Client } from 'pg';
const {Client} = require('pg')
const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'PGT09_assign002',
    user: 'postgres',
    password: '1234',
})

//Database connection
client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')
    }
})

// const execute = async (query) => {
//     try {
//         await client.connect();     // gets connection
//         await client.query(query);  // sends queries
//         alert('database connection...')
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();         // closes connection
//     }
// };

// const text = `
//     CREATE TABLE IF NOT EXISTS "users" (
// 	    "id" SERIAL,
// 	    "name" VARCHAR(100) NOT NULL,
// 	    "role" VARCHAR(15) NOT NULL,
// 	    PRIMARY KEY ("id")
//     );`;

// execute(text).then(result => {
//     if (result) {
//         console.log('Table created');
//     }
// });


// window.location.href = 'login/login.html'