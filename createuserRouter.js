// createuserRouter.js
// Express router to serve the Create User page and handle user creation logic

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to userprofile.json (adjust as needed)
const USERS_FILE = path.join(__dirname, 'userprofile.json');

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

// Serve the Create User HTML page (as a template string)
router.get('/createuser', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create User Profile</title>
        <link rel="stylesheet" href="/bootstrap.css">
    </head>
    <body>
        <div class="container mt-5">
            <h2 class="mb-4">Create User Profile</h2>
            <form id="createUserForm">
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" name="name" required>
                </div>
                <div class="mb-3">
                    <label for="role" class="form-label">Role</label>
                    <select class="form-select" id="role" name="role" required>
                        <option value="">Select Role</option>
                        <option value="FR">Fundraiser</option>
                        <option value="Donor">Donor</option>
                        <option value="PM">Project Manager</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="contact" class="form-label">Contact Information</label>
                    <input type="text" class="form-control" id="contact" name="contact" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div id="successMessage" class="alert alert-success mt-3 d-none" role="alert">
                User profile created successfully!
            </div>
        </div>
        <div class="mt-5">
            <h3>Existing Users</h3>
            <ul id="userList" class="list-group"></ul>
        </div>
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('createUserForm');
            const successMessage = document.getElementById('successMessage');
            const userList = document.getElementById('userList');

            function loadUsers() {
                fetch('/createuser/api/users')
                    .then(response => response.json())
                    .then(users => {
                        userList.innerHTML = '';
                        if (Array.isArray(users) && users.length > 0) {
                            users.forEach(user => {
                                const li = document.createElement('li');
                                li.className = 'list-group-item';
                                li.textContent = user.name + ' (' + user.role + ') - ' + user.contact;
                                <!-- Append user info to the list (place holder!!!!!)-->
                                userList.appendChild(li);
                            });
                        } else {
                            userList.innerHTML = '<li class="list-group-item">No users found.</li>';
                        }
                    })
                    .catch(() => {
                        userList.innerHTML = '<li class="list-group-item text-danger">Failed to load users.</li>';
                    });
            }

            loadUsers();

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const name = document.getElementById('name').value.trim();
                const role = document.getElementById('role').value;
                const contact = document.getElementById('contact').value.trim();

                if (!name || !role || !contact) {
                    alert('Please fill in all fields.');
                    return;
                }

                fetch('/createuser/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, role, contact })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        successMessage.classList.remove('d-none');
                        form.reset();
                        loadUsers();
                    } else {
                        alert(data.error || 'Failed to create user.');
                    }
                })
                .catch(() => {
                    alert('Server error. Please try again later.');
                });
            });
        });
        </script>
    </body>
    </html>
    `);
});

// API endpoint to get all users (scoped to /createuser/api/users)
router.get('/createuser/api/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// API endpoint to create user (scoped to /createuser/api/users)
router.post('/createuser/api/users', (req, res) => {
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

module.exports = router;
