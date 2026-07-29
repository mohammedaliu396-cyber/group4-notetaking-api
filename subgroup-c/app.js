const express = require("express");

const app = express();

// Parse incoming JSON requests
app.use(express.json());
const noteRoutes = require("./routes/notes");

app.use("/api/notes", noteRoutes);

const PORT = 3000;


app.get("/", (req, res) => {
  res.send("Server is up and running!");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});