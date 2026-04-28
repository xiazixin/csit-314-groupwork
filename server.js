// server.js
// Simple Node.js + Express backend to save user profiles to users.json

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Use port 3000 for development


app.use(bodyParser.json());

// Import and use the autoindex route
const autoindexRouter = require('./autoindex');
app.use(autoindexRouter);

// Import and use the createuserRouter
const createuserRouter = require('./createuserRouter');
app.use(createuserRouter);

// Import and use the test router
const testRouter = require('./test');
app.use(testRouter);

// Set static directory to Apache's web root for this project
const STATIC_DIR = '/var/www/html/csit-314-groupwork'; // Adjust if your setup differs !!!!!!!!very important to set this correctly to serve files from the right location
// Adjust if your setup differs !!!!!!!!very important to set this correctly to serve files from the right location
// Adjust if your setup differs !!!!!!!!very important to set this correctly to serve files from the right location
// Adjust if your setup differs !!!!!!!!very important to set this correctly to serve files from the right location important things must repeated 3 times.
app.use(express.static(STATIC_DIR)); // Serve static files (HTML, JS, CSS)

const USERS_FILE = path.join(STATIC_DIR, 'userprofile.json');

// Helper to read users.json
function readUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Helper to write users.json
function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}




app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
