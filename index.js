const { request, response } = require('express');
const {getAllTasks, deleteTask, addTask, updateTask} = require('./services')
const express = require('express');
const app = express();

app.use(express.json());
// const http = require('http');

const tasks = require('./tasks.json');

app.get('/', (request, response)=>{
    response.send('<h1> Hola Mundo </h1>')
})

app.get('/api/tasks', async (request, response) => {
    const tasks = await getAllTasks();
    response.json(tasks); 
  
})

app.get('/api/tasks/:id', async (request, response) => {
    const id = Number(request.params.id)
    const allTasks = await getAllTasks();
    const task = allTasks.find(x => x.id === id);

    if (task) {
        response.json(task);
    } else{
        response.status(404).end();
    }
})


app.delete('/api/tasks/:id', (request, response) => {
    const id = Number(request.params.id);
    deleteTask(id);
    response.status(204).end();
})

app.post('/api/tasks', async (request, response) => {
    try {
        const task = request.body
    
    if (!task || !task.content) {
        return response.status(400).json({
            error: 'task content is missing'
        })
    }
    
        const newTask = await addTask(task.content);
        response.status(201).json(newTask);
        
    } catch (error) {
        console.log(error)
    }
})

app.put('/api/tasks/:id', async (request, response) => {
   try {
       
    const id = Number(request.params.id);
    const task = request.body

    const taskUpdated = await updateTask(id, task);
    response.status(202).json(taskUpdated);

   } catch (error) {
       console.log(error)
   }
})



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(process.env);
    console.log(`Server running on port ${PORT}`)
} );
