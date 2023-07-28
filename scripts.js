// Code for the login page
const loginForm = document.getElementById('loginForm');



loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log(username)
    // Send login credentials to the server for verification
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful, redirect to the file upload page
            window.location.href = '/upload.html';
        } else {
            // Login failed, display an error message to the user
            alert('Login failed. Please check your username and password.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
    });
});


// Code for the file upload page
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file');
    const email1 = document.getElementById('email1').value;
    const email2 = document.getElementById('email2').value;
    const email3 = document.getElementById('email3').value;
    const email4 = document.getElementById('email4').value;
    const email5 = document.getElementById('email5').value;

    // Implement logic to handle file upload and sending email addresses to the server
    // You can use FormData and fetch() or XMLHttpRequest to upload the file and submit the form data.
    // Handle the server response and display appropriate messages to the user.
});
