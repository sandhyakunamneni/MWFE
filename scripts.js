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

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('file');
  const email1 = document.getElementById('email1').value;
  const email2 = document.getElementById('email2').value;
  const email3 = document.getElementById('email3').value;
  const email4 = document.getElementById('email4').value;
  const email5 = document.getElementById('email5').value;

  // Create a new FormData object and append the file and email data to it
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('email1', email1);
  formData.append('email2', email2);
  formData.append('email3', email3);
  formData.append('email4', email4);
  formData.append('email5', email5);

  try {
    // Send the FormData to the server using the fetch() method
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });

    // Handle the server response
    if (response.ok) {
      // If the response status is in the range 200-299
      // Display a success message to the user
      console.log('Upload and send successful!');
      // You can also display a success message to the user in the UI if needed
    } else {
      // If the response status is not in the range 200-299
      // Display an error message to the user
      console.error('Upload and send failed. Please try again later.');
      // You can also display an error message to the user in the UI if needed
    }
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle any other errors that might occur during the process
  }
});

