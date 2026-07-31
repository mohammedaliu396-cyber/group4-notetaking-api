const { notes, stringDate } = require("../models/noteModel");

// GET ALL NOTES
function getAllNotes(req, res) {
    res.status(200).json(notes);
}

// GET NOTE BY ID
function getSingleNote(req, res) {
    const note = notes.find(
        (n) => n.id === parseInt(req.params.id)
    );

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    res.status(200).json(note);
}

// CREATE NOTE
function createNote(req, res) {

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            message: "Title and body are required."
        });
    }

    const newNote = {
        id: notes.length + 1,
        date: stringDate,
        title,
        body
    };

    notes.push(newNote);

    res.status(201).json(newNote);
}

// UPDATE NOTE
function updateNote(req, res) {

    const note = notes.find(
        (n) => n.id === parseInt(req.params.id)
    );

    if (!note) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({
            message: "Title and body are required."
        });
    }

    note.title = title;
    note.body = body;

    res.status(200).json(note);
}

// DELETE NOTE
function deleteNote(req, res) {

    const index = notes.findIndex(
        (n) => n.id === parseInt(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Note not found"
        });
    }

    notes.splice(index, 1);

    res.status(204).send();
}

module.exports = {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
};