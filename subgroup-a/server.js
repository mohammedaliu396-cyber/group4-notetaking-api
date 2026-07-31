require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(express.json());

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// ===== In-memory data store =====
let notes = [];
let nextId = 1;

// ===== Routes =====

// CREATE - POST /notes
app.post('/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }

  const note = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };

  notes.push(note);
  res.status(201).json(note);
});

// READ ALL - GET /notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// READ ONE - GET /notes/:id
app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// UPDATE - PUT /notes/:id
app.put('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const { title, content } = req.body;
  if (!title && !content) {
    return res.status(400).json({ error: 'Provide title and/or content to update' });
  }

  if (title) note.title = title;
  if (content) note.content = content;
  note.updatedAt = new Date().toISOString();

  res.json(note);
});

// DELETE - DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const deleted = notes.splice(index, 1);
  res.json({ message: 'Note deleted', note: deleted[0] });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
