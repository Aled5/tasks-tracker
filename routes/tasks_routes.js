const express = require('express');
const router = express.Router();

//Import Controllers associated with tasks
const { 
    createNewTask, 
    updateTask, 
    deleteTask,  
 } = require('../controllers/tasks_controllers.js');
  
//POST: App to add a new task to a section (POST('/api/sections/:section_id/tasks/:task_id')
router.post('/sections/:section_id/tasks/:task_id', createNewTask);

//PUT: Update a task in a section (PUT('/api/sections/:section_id/tasks/:task_id')
router.put('/sections/:section_id/tasks/:task_id', updateTask);
  
//DELETE: Delete a task from a section (DELETE('/api/sections/:section_id/tasks/:task_id')
router.delete('/sections/:section_id/tasks/:task_id', deleteTask);

//Alternative sintax for the above routes
//router.route('/:section_id/tasks/:task_id').post(createNewTask).delete(deleteTask).put(updateTask); 

module.exports = router;

