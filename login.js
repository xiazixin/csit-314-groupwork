// login.js
// Fetches users.json and validates login form

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch('/users.json');
      if (!response.ok) throw new Error('Failed to load users data');
      const users = await response.json();
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        alert('Login successful!');
        // Redirect or further logic here
      } else {
        alert('Invalid username or password');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
});
