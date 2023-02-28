const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/signup", upload.single("image"), function(req, res) {
  // Log the request body to the console for debugging
  console.log(req.body);

  // TODO: Store the user data in a database or file
  // TODO: Generate a unique ID for the user and store it with the user data
  // TODO: Return a response indicating success or failure
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
