const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const bcrypt = require("bcrypt");

// Fake user database
const users = [];

// Middleware to log incoming requests
app.use(function(req, res, next) {
  console.log(req.method, req.url, req.body);
  next();
});

// Route to handle user signups
app.post("/signup", upload.single("image"), function(req, res) {
  // Validate the user input
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.age) {
    return res.status(400).send("Missing required fields");
  }

  // Check if the email already exists in the database
  const existingUser = users.find(user => user.email === req.body.email);
  if (existingUser) {
    return res.status(409).send("Email already exists");
  }

  // Hash the password and store the user data in the database
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    const newUser = {
      id: generateUniqueId(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      age: req.body.age,
      image: req.file ? req.file.filename : null
    };
    users.push(newUser);

    // Return a response indicating success
    return res.status(201).send("User created");
  });
});

// Helper function to generate a unique ID for a new user
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Start the server
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
