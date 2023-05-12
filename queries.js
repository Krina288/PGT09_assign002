const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'PGT09_assign002',
    user: 'postgres',
    password: '1234',
})

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        mobile_num VARCHAR(12) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(32) NOT NULL
      )
    `;
        await pool.query(query);
        console.log('Table created successfully');
    } catch (error) {
        console.error('Error creating table', error);
        throw error;
    }
}

async function createUser(first_name, last_name, mobile_num, email, password) {
    try {
        const query = 'INSERT INTO users (first_name, last_name, mobile_num, email, password) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(query, [first_name, last_name, mobile_num, email, password]);
        return 'User created successfully';
    } catch (error) {
        console.log('Error executing createUser query', error);
    }
}

async function fetchUsers() {
    try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Error executing fetchUsers query', error);
    }
}

async function checkUserExist(email, password) {
    try {
        const query = 'SELECT COUNT(*) AS userCount FROM users WHERE email = $1 AND password = $2';
        const result = await pool.query(query, [email, password]);
        const credentialCount = result.rows[0].userCount
        return credentialCount > 0;
    } catch (error) {
        console.log('Error executing checkUserExist query', error);
    }
}

async function createPostTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        txt_post_title VARCHAR(255) NOT NULL,
        txt_post_msg VARCHAR(255) NOT NULL,
        post_type VARCHAR(12) NOT NULL
      )
    `;
        await pool.query(query);
        console.log('Post table created successfully');
    } catch (error) {
        console.error('Error creating table', error);
        throw error;
    }
}

async function createPost(txt_post_title, txt_post_msg, post_type) {
    try {
        const query = 'INSERT INTO posts (txt_post_title, txt_post_msg, post_type) VALUES ($1, $2, $3)';
        await pool.query(query, [txt_post_title, txt_post_msg, post_type]);
        return 'Post created successfully';
    } catch (error) {
        console.log('Error executing createPost query', error);
    }
}

async function fetchPosts() {
    try {
        const query = 'SELECT * FROM posts ORDER BY id ASC';
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.log('Error executing fetchPosts query', error);
    }
}

async function fetchPostDetailsById(id) {
    console.log('fetchPostDetailsById id ===>', id);
    try {
        const query = 'SELECT * FROM posts WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.log('Error executing post details query', error);
    }
}

async function editPost(txt_post_title, txt_post_msg, post_type, post_id) {
    try {
        const query = 'UPDATE posts SET txt_post_title = $1, txt_post_msg = $2, post_type = $3 WHERE id = $4';
        await pool.query(query, [txt_post_title, txt_post_msg, post_type, post_id]);
        return 'Post details updated successfully';
    } catch (error) {
        console.log('Error executing editPost query', error);
    }
}

module.exports = {
    createUser,
    createTable,
    fetchUsers,
    checkUserExist,
    createPostTable,
    createPost,
    fetchPosts,
    fetchPostDetailsById,
    editPost
}