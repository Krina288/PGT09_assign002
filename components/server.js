// var http = require('http');
// var fs = require('fs');

// const PORT = 8080;

// fs.readFile('./login/login.html', function (err, html) {

//     if (err) throw err;

//     http.createServer(function (request, response) {
//         response.writeHeader(200, { "Content-Type": "text/html" });
//         response.write(html);
//         response.end();
//     }).listen(PORT);
// });

let http = require('http');

let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write('Hi There!');
    response.end();
};

http.createServer(handleRequest).listen(8000);