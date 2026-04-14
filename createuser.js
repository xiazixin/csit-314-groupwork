// createuser.js
// Handles user profile creation logic for createuser.html

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createUserForm');
    const successMessage = document.getElementById('successMessage');
    const userList = document.getElementById('userList');

    // Fetch and display users
    function loadUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = '';
                if (Array.isArray(users) && users.length > 0) {
                    users.forEach(user => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.textContent = `${user.name} (${user.role}) - ${user.contact}`;
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

    // Initial load
    loadUsers();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const role = document.getElementById('role').value;
        const contact = document.getElementById('contact').value.trim();

        // Simple validation
        if (!name || !role || !contact) {
            alert('Please fill in all fields.');
            return;
        }

        // Send data to backend
        fetch('/api/users', {
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
                loadUsers(); // Refresh user list
            } else {
                alert(data.error || 'Failed to create user.');
            }
        })
        .catch(() => {
            alert('Server error. Please try again later.');
        });
    });
});
