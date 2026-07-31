# Note-Taking API — Subgroup A

**Group 4 — Backend Development Project (BeTechified)**

A simple REST API and web interface for creating, viewing, updating, and deleting text notes.

## Tech Stack
- Node.js + Express.js (backend)
- HTML/CSS/JavaScript (frontend)
- In-memory data storage

## Features
- Create a note (title + content)
- View all notes
- View a single note
- Update a note
- Delete a note
- Input validation with proper error responses
- Request logging middleware
- Simple web UI to interact with the API directly in the browser

## API Endpoints

| Method | Endpoint      | Description           |
|--------|---------------|------------------------|
| POST   | /notes        | Create a new note      |
| GET    | /notes        | Get all notes          |
| GET    | /notes/:id    | Get a single note      |
| PUT    | /notes/:id    | Update a note          |
| DELETE | /notes/:id    | Delete a note          |

### Example: Create a note

POST /notes
Content-Type: application/json
{
"title": "My First Note",
"content": "This is the content of my note."
}
Response (201):
{
"id": 1,
"title": "My First Note",
"content": "This is the content of my note.",
"createdAt": "2026-07-20T12:00:00.000Z"
}
Server runs on `http://localhost:3000` (or the port set in `.env`).

## Testing
Import `postman_collection.json` into Postman to test all endpoints, including error cases (missing fields, invalid ID).

## Deployment
Deployed on Render — build command `npm install`, start command `npm start`.

## Team
Subgroup A, Group 4 — Backend Development, BeTechified.
