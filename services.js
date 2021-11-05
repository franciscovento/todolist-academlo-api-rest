const fs = require('fs/promises');
const path = require('path');

const TASK_PATH = path.resolve('tasks.json');

const getAllTasks = async () => {
try {
    
    const tasks = await fs.readFile(TASK_PATH, 'utf8');
    
    return JSON.parse(tasks);

} catch (error) {
    console.log(error)
}
}

const writeTasks = async (todoList) => {
    try {
        await fs.writeFile(TASK_PATH, JSON.stringify(todoList));
    } catch (error) {
        console.log(error)
        
    }
}

const getTaskByid = async (id) => {
    try {
        const Tasks = await getAllTasks();
        const taskFinded = Tasks.find(x => x.id === id)
        return taskFinded;

    } catch (error) {
        console.log(error)
    }

}


const deleteTask = async (id) => {
    const tasks = await getAllTasks();
    if (tasks.find(x => x.id == id)) {
        const newTasks = tasks.filter(x => x.id !== id)
        writeTasks(newTasks);
    }
}

const updateTask = async (id, task) => {
try {
    const allTasks = await getAllTasks();
    const taskIndex = allTasks.findIndex(x => x.id === id);

    const updatedTask = {
        ...allTasks[taskIndex],
        ...task,
      };

      allTasks[taskIndex] = updatedTask;
      await writeTasks(allTasks);
      return updatedTask;
  
   

} catch (error) {
    console.log(error)
}    

}

const addTask = async (taskContent) => {
    let allTasks = await getAllTasks();
    const date = Date.now();
    const ids = allTasks.map(x => x.id);
    const maxId = Math.max(...ids);

    const newTask = {
        id: maxId + 1,
        content: taskContent,
        date: new Date(date).toDateString(),
        completed: false
    }

    allTasks = [...allTasks, newTask];
    writeTasks(allTasks);
    return newTask;
}

module.exports = {
    getAllTasks,
    getTaskByid,
    addTask,
    writeTasks,
    deleteTask,
    updateTask
  };
  
