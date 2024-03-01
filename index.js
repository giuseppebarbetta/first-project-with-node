// Xpress é um framework do Node JS
const express = require('express')
const app = express()
const port = 3000
const uuid = require('uuid')

app.use(express.json())

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex( user => user.id === id)

    if (index <0) {
        return response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

// GET -> coloca as informações na tela...
app.get('/users', (request, response ) => {
    return response.json(users)
})

// POST -> criar novas informações...
app.post('/users', (request, response ) => {
    const {name, age} = request.body
    const user = { id:uuid.v4(), name, age}

    users.push(user)
    return response.status(201).json(user)
})

// PUT or PATH para atualizar informações...
app.put('/users/:id', checkUserId, (request, response ) => {
    const { name, age} = request.body
    const index = request.userIndex
    const id = request.userId
    const updatedUser = { id, name, age}      

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response ) => {
    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json()
})

// Para informar qual porta será utilizada para que possamos acessar o conteúdo.
app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})