const express = require('express');  // Import the Express.js framework
const fs = require('fs');            // Import the Node.js File System module
const path = require('path');        // Import the Node.js Path module

const app = express();               // Create an instance of the Express application
const port = 3000;                   // Define the port the server will listen on

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to display the person's name from person.json
app.get('/', (req, res) => {
  // Read the contents of person.json file
  fs.readFile(path.join(__dirname, 'data', 'person.json'), 'utf8', (err, data) => {
    if (err) {
      // If an error occurs, send a 500 Internal Server Error response
      res.status(500).send('Internal Server Error');
    } else {
      // Parse the JSON data from person.json
      const person = JSON.parse(data);
      // Add HTML and CSS styling to the response and include the person's name
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              text-align: center;
            }
            h1 {
              color: #333;
              font-size: 36px;
              margin-top: 50px;
            }
            p {
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <h1>Welcome ${person.name}!</h1>
          <p>Thank you for visiting our website!</p>
        </body>
        </html>
      `);
    }
  });
});

// Define a catch-all route for unknown paths
app.get('*', (req, res) => {
  // Send a 404 Not Found response for unknown paths
  res.status(404).send('Sorry! Can\'t find that resource. Please check your URL');
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

