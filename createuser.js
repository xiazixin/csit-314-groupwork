// createuser.js
// Handles user profile creation logic for createuser.html

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createUserForm');
    const successMessage = document.getElementById('successMessage');

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
            } else {
                alert(data.error || 'Failed to create user.');
            }
        })
        .catch(() => {
            alert('Server error. Please try again later.');
        });
    });
});
