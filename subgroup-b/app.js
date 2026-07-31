const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json());


let notes = [
  { id: 1, title: 'First Note', content: 'This is my first test note.' }
];



// 1. CREATE
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required.' });
  }

  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// 2. READ ALL
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// 2. READ ONE
app.get('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find(n => n.id === noteId);

  if (!note) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  res.json(note);
});

// 3. UPDATE
const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title,
    content
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});