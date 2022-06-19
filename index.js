/* const http = require("http");
const app = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify(notas));
}); */
const express = require('express')
const app = express()
const logger = require('./loggerMiddleWare')
app.use(express.json())
app.use(logger)
let notes = [
  {
    id: 1,
    content: ' Tomás el mejorr',
    important: false
  },
  {
    id: 2,
    content: ' Jose el peor',
    important: true,
    date: new Date()
  }
]

app.get('/', (request, response) => {
  response.send('<h1> hello mundo cruel </h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)

  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
app.use((request,response)=>{
  response.status(404)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({ error: 'note.content is missing' })
  }
  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)
  response.json(newNote)
})
