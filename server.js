const { Client } = require('pg');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { createUser, createTable, fetchUsers,
        checkUserExist, createPostTable, createPost,
        fetchPosts, fetchPostDetailsById, editPost,
        fetchSerachPostList, deletePost, checkEmailRegistered} = require('./queries')

const server = http.createServer(async(req, res) => {
    const urlPath = req.url
    const parsedUrl = url.parse(req.url, true);
    const queryParameters = parsedUrl.query;

    console.log('request url: ', urlPath, req.method);

    const file = __dirname
    if (urlPath === '/' || urlPath === '/login.html') {
        const filePath = path.join(file.concat('/view'), '/login.html');
        fs.readFile(filePath, 'utf8', async(err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving login page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                await createTable();
                res.end(content);
            }
        });
    } else if (urlPath === '/dashboard.html') {
        const filePath = path.join(__dirname, '/view/dashboard.html');
        fs.readFile(filePath, async(err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving dashboard page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                await createPostTable();
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
        fs.readFile(filePath, async(err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving signup page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                await createTable();
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
    } else if (urlPath === '/searchPost.html') {
        const filePath = path.join(__dirname, '/view/searchPost.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving searchPost page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    } else if (urlPath === '/userProfile.html') {
        const filePath = path.join(__dirname, '/view/userProfile.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving userProfile page');
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
    } else if (urlPath === '/searchPost.js') {
        const filePath = path.join(__dirname, '/controller/searchPost.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving searchPost.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath === '/userProfile.js') {
        const filePath = path.join(__dirname, '/controller/userProfile.js');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Error serving userProfile.js page');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(content);
            }
        });
    } else if (urlPath == '/users') {
        try {
            const users = await fetchUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        } catch (error) {
            console.error('Error retrieving users', error);
            res.writeHead(500);
            res.end('Error retrieving users');
        }
    } else if (urlPath == '/registerUser') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async() => {
            const userData = JSON.parse(body);
            console.log('userData =>', userData);

            const emailExists = await checkEmailRegistered(userData.email);
            if (emailExists) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Email is already registered.' }));
                return;
            }
            try {
                const response = await createUser(userData.first_name, userData.last_name, userData.mobile_num, userData.email, userData.password);
                res.writeHead(200);
                res.end(JSON.stringify(response));
            } catch (error) {
                console.error('Error creating user', error);
                res.writeHead(500);
                res.end('Error creating user');
            }
        })
    } else if (urlPath == '/loginUser') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const userData = JSON.parse(body);
            try {
                const response = await checkUserExist(userData.email, userData.password)
                console.log('checkUserExist: ', response);
                res.writeHead(200);
                res.end(JSON.stringify(response));
            } catch (error) {
                console.error('Error fetching user', error);
                res.writeHead(500);
                res.end('Error fetching user');
            }
        })
    } else if (urlPath == '/createPost') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const postData = JSON.parse(body);
            try {
                const response = await createPost(postData.txt_post_title, postData.txt_post_msg, postData.post_type, postData.created_user_id)
                res.writeHead(200);
                res.end(JSON.stringify(response));
            } catch (error) {
                console.error('Error creating post', error);
                res.writeHead(500);
                res.end('Error creating post');
            }
        })
    } else if (urlPath == '/getPosts') {
        try {
            const posts = await fetchPosts();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));
        } catch (error) {
            console.error('Error retrieving posts', error);
            res.writeHead(500);
            res.end('Error retrieving posts');
        }
    } else if (urlPath.startsWith == '/getPostsDetails/:id') {
        console.log('req.params.id, ', req.url.params.id);
        try {
            const postDetails = await fetchPostDetailsById(req.url.params.id)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(postDetails));
        } catch (error) {
            console.error('Error retrieving post details', error);
            res.writeHead(500);
            res.end('Error retrieving post details');
        }
    } else if (urlPath == '/editPost') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const postData = JSON.parse(body);
            try {
                const response = await editPost(postData.txt_post_title, postData.txt_post_msg, postData.post_type, postData.id)
                res.writeHead(200);
                res.end(JSON.stringify(response));
            } catch (error) {
                console.error('Error editing post', error);
                res.writeHead(500);
                res.end('Error editing post');
            }
        })
    } else if (urlPath == `/getSearchPosts?search=${queryParameters.search}`) {
        try {
            const posts = await fetchSerachPostList(queryParameters.search);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));
        } catch (error) {
            console.error('Error retrieving search posts', error);
            res.writeHead(500);
            res.end('Error retrieving search posts');
        }
    } else if (urlPath == `/deletePost?id=${queryParameters.id}`) {
        try {
            const post = await deletePost(queryParameters.id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(post));
        } catch (error) {
            console.error('Error retrieving delete post', error);
            res.writeHead(500);
            res.end('Error retrieving delete post');
        }
    }
    
    else if (urlPath.startsWith === '/assets') {
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



const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});