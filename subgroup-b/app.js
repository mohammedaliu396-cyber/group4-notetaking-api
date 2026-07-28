require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Home route
app.get("/", (req, res) => {
    res.send("Welcome to the Note-Taking API!");
});

//Middleware
app.use(express.json());

//Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});