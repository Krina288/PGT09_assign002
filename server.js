const { Client } = require('pg');
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const urlPath = req.url
    console.log('request url: ', urlPath, req.method);
    const file = __dirname
    if (urlPath === '/' || urlPath === '/login.html') {
        const filePath = path.join(file.concat('/view'), '/login.html');
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving login page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/dashboard.html') {
        const filePath = path.join(__dirname, '/view/dashboard.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving dashboard page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/viewPost.html') {
        const filePath = path.join(__dirname, '/view/viewPost.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving viewpost page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/signup.html') {
        const filePath = path.join(__dirname, '/view/signup.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving signup page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/editPost.html') {
        const filePath = path.join(__dirname, '/view/editPost.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving editpost page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/login.js') {
        const filePath = path.join(__dirname, '/controller/login.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving login.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath === '/dashboard.js') {
        const filePath = path.join(__dirname, '/controller/dashboard.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving dashboard.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath === '/viewPost.js') {
        const filePath = path.join(__dirname, '/controller/viewPost.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving viewPost.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath === '/signup.js') {
        const filePath = path.join(__dirname, '/controller/signup.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving signup.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath === '/editPost.js') {
        const filePath = path.join(__dirname, '/controller/editPost.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving editpost.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath.startsWith === '/assets') {
        console.log('urlPath.startsWith: ', urlPath);
        const filePath = path.join(__dirname, urlPath);
        console.log('filepath: ', filePath);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving file');
            } else {
                const ext = path.extname(filePath);
                let contentType = 'image/jpeg';

                if (ext === '.png') {
                    contentType = 'image/png';
                } else if (ext === '.gif') {
                    contentType = 'image/gif';
                }

                res.writeHead(200, { 'Content-Type': contentType });
                res.write(content);
                res.end();
            }
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'PGT09_assign002',
    user: 'postgres',
    password: '1234',
})

// Database connection
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
//         console.log('database connection...')
//         return true;
//     } catch (error) {
//         console.error(error.stack);
//         return false;
//     } finally {
//         await client.end();         // closes connection
//     }
// };

const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "id" SERIAL,
	    "name" VARCHAR(100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

// execute(text).then(result => {
//     if (result) {
//         console.log('Table created');
//     }
// });

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});