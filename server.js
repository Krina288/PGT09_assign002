const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const urlPath = req.url
    console.log('request url: ', urlPath);
    if (urlPath === '/' && req.method === 'POST') {
        // if (urlPath === '/login.html') {
        //     fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        //     // fs.readFile('index.html', 'utf8', (err, content) => {
        //         if (err) {
        //             console.log('errrr', err);
        //             res.writeHead(500, { 'Content-Type': 'text/plain' });
        //             res.end('Internal Server Error');
        //         } else {
        //             res.writeHead(200, { 'Content-Type': 'text/html' });
        //             res.write(content);  
        //             res.end();
        //         }
        //     });
        // } else if (urlPath === '/dashboard.html') {
            fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
                // fs.readFile('index.html', 'utf8', (err, content) => {
                if (err) {
                    console.log('errrr', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(content);
                    res.end();
                }
            });
        // }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});