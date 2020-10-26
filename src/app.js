const express = require('express')
const cors = require('cors')

const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (req, res) => {
  res.json(repositories)
})

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository)

  return res.json(repository)
})

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id == id
  )

  if (repositoryIndex < 0) {
    res.status(400).send()
  }

  repositories[repositoryIndex] = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  return res.json(repositories[repositoryIndex])
})

app.delete('/repositories/:id', (req, res) => {
  // TODO
})

app.post('/repositories/:id/like', (req, res) => {
  // TODO
})

module.exports = app
