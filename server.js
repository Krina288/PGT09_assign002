const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const urlPath = req.url
    console.log('request url: ', urlPath, req.method);
    const file = __dirname
    if (urlPath === '/' || urlPath === '/login.html') {
        const filePath = path.join(file.concat('/view'), '/login.html');
        console.log('filepath, ', filePath);
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
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath =  path.join(__dirname, '/view/dashboard.html') ;
        console.log('filepath, ', filePath);
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
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath = path.join(__dirname, '/view/viewPost.html');
        console.log('filepath, ', filePath);
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
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath = path.join(__dirname, '/view/signup.html');
        console.log('filepath, ', filePath);
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
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath = path.join(__dirname, '/view/editPost.html');
        console.log('filepath, ', filePath);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving editpost page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }
    
    
    
    else if (urlPath === '/login.js') {
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath = path.join(__dirname, '/controller/login.js');
        console.log('filepath, ', filePath);
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
        // fs.readFile('../PGT09_assign002/components/Dashboard/dashboard.html', 'utf8', (err, content) => {
        console.log('fileee: ', file);
        const filePath = path.join(__dirname, '/controller/dashboard.js');
        console.log('filepath, ', filePath);
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
        console.log('filepath, ', filePath);
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
        console.log('filepath, ', filePath);
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
        console.log('filepath, ', filePath);
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving editpost.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } 
    
    
    
    else if (urlPath.startsWith === '/assests') {
        //create seprate folder for view and controller ---- tomorrow
        const filePath = path.join(__dirname, '/assests');
        console.log('new filepath: ', filePath);
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

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});