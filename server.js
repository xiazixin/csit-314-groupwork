// server.js
// Simple Node.js + Express backend to save user profiles to users.json

const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000; // Use port 3000 for development

// Import and use the autoindex route
const autoindexRouter = require('./autoindex');
app.use(autoindexRouter);

// Set static directory to Apache's web root for this project
const STATIC_DIR = '/var/www/html/csit-314-groupwork';
app.use(bodyParser.json());
app.use(express.static(STATIC_DIR)); // Serve static files (HTML, JS, CSS)

const USERS_FILE = path.join(STATIC_DIR, 'users.json');

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

// API endpoint to create user
app.post('/api/users', (req, res) => {
    const { name, role, contact } = req.body;
    if (!name || !role || !contact) {
        return res.status(400).json({ error: 'All fields required.' });
    }
    const users = readUsers();
    const newUser = { id: Date.now(), name, role, contact };
    users.push(newUser);
    writeUsers(users);
    res.json({ success: true, user: newUser });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
