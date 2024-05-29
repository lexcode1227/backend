const express = require('express')
const axios = require('axios')

const app = express()
const port = 3000
const urlApi = 'https://jsonplaceholder.typicode.com/todos'

app.use(express.json())

app.get('/todos', async (req, res)=>{
    try {
        const response = await axios.get(urlApi);
        res.json(response.data);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

app.get('/todos/:id', async (req, res)=>{
    try {        
        const todoId = parseInt(req.params.id)
        const response = await axios.get(`${urlApi}/${todoId}`);
        res.json(response.data.title).status(200)
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

app.get('/todos/:title', async (req, res)=>{
    try {        
        const {data} = await axios.get(urlApi)
        const todoTitle = req.params.title
        const todo = data.find(res => res.title === todoTitle)
        if (todo) {            
            res.json(todo).status(200)
        } else {
            res.status(404).send("No se encontro el todo");
        }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

app.get('/todos/five', async (req, res)=>{
    try {        
        const {data} = await axios.get(urlApi)
        let fiveTodos = [];
        for(let i = 0; i < 5; i++)
        {
            fiveTodos.push(data[i]);
        }
        res.json(fiveTodos).status(200);
    } catch (error) {
        console.error('Error al obtener los 5 todos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port} y en la url: http://localhost:${port}`);
})