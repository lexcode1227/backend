const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

let tasks = []

app.get('/tasks', (req, res)=>{
    res.json(tasks)
})

app.post('/tasks', (req, res)=>{
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.get('/tasks/:id', (req, res)=>{
    const taskId = parseInt(req.params.id)
    const task = tasks.find(item=>item.id === taskId)
    if (task) {
        res.json(task)
    } else {
        res.status(404).send('No se encontró esa tarea') 
    }
})

app.put('/tasks/:id', (req, res)=>{
    const taskId = parseInt(req.params.id)
    const task = tasks.find(item=>item.id === taskId)
    if (task) {
        task.title = req.body.title || task.title
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed
        res.json(task)
    } else {
        res.status(404).send('No se encontró esa tarea') 
    }
})
app.delete('/tasks/:id', (req, res)=>{
    const taskId = parseInt(req.params.id)
    const task = tasks.findIndex(item=>item.id === taskId)
    if (task !== -1) {
        tasks.splice(task, 1)
        res.status(202).send('Tarea eliminada correctamente')
    } else {
        res.status(404).send('No se eliminó esa tarea') 
    }
})

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port} y en la url: http://localhost:${port}`);
})