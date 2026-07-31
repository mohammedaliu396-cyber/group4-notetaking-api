const API_URL = '/notes';
let editingId = null;

async function fetchNotes() {
  const container = document.getElementById('notes-container');
  try {
    const res = await fetch(API_URL);
    const notes = await res.json();

    if (notes.length === 0) {
      container.innerHTML = '<p class="empty-state">No notes yet. Add one above!</p>';
      return;
    }

    container.innerHTML = notes.map(note => `
      <div class="note-card">
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.content)}</p>
        <div class="note-meta">Created: ${new Date(note.createdAt).toLocaleString()}</div>
        <div class="note-actions">
          <button class="edit-btn" onclick="startEdit(${note.id}, '${escapeQuotes(note.title)}', '${escapeQuotes(note.content)}')">Edit</button>
          <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load notes.</p>';
  }
}

async function submitNote() {
  const title = document.getElementById('note-title').value.trim();
  const content = document.getElementById('note-content').value.trim();
  const errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = '';

  if (!title || !content) {
    errorMsg.textContent = 'Please fill in both title and content.';
    return;
  }

  try {
    let res;
    if (editingId) {
      res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
    } else {
      res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content })
      });
    }

    if (!res.ok) {
      const err = await res.json();
      errorMsg.textContent = err.error || 'Something went wrong.';
      return;
    }

    resetForm();
    fetchNotes();
  } catch (err) {
    errorMsg.textContent = 'Network error. Please try again.';
  }
}

function startEdit(id, title, content) {
  editingId = id;
  document.getElementById('note-id').value = id;
  document.getElementById('note-title').value = title;
  document.getElementById('note-content').value = content;
  document.getElementById('form-title').textContent = 'Edit Note';
  document.getElementById('submit-btn').textContent = 'Save Changes';
  document.getElementById('cancel-btn').style.display = 'inline-block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelEdit() {
  resetForm();
}

function resetForm() {
  editingId = null;
  document.getElementById('note-id').value = '';
  document.getElementById('note-title').value = '';
  document.getElementById('note-content').value = '';
  document.getElementById('form-title').textContent = 'Add a New Note';
  document.getElementById('submit-btn').textContent = 'Add Note';
  document.getElementById('cancel-btn').style.display = 'none';
  document.getElementById('error-msg').textContent = '';
}

async function deleteNote(id) {
  if (!confirm('Delete this note?')) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchNotes();
  } catch (err) {
    alert('Failed to delete note.');
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escapeQuotes(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// Initial load
fetchNotes();
