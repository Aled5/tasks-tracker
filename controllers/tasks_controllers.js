//Controllers asociated with tasks


//Import Node JS modules
const path = require('path'); 
// const fs = require('fs')
const fs = require('fs').promises;

//Import utils functions
const {write_json_file_database} = require('../utils/json_file_database_functions.js');

//POST: App to add a new task to a section (POST('/api/sections/:section_id/tasks/:task_id')
const createNewTask = async (req, res) => {

    console.log('Post request received to add a task to a section.');
  
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
    const task_id = req.params.task_id; // Extract the task ID from the request parameters
  
    //1. I need to read the file and see if it exists
    //const json_string_database = await read_json_file_database(); // Read the file asynchronously
    const json_string_database = req.jsonData; // Use the JSON data from the middleware

    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object
  
    //3. I need to add the task to the section with the given ID
    const section_to_update = json_object_database.sections.find(section => String(section.id) === String(section_id));
    //console.log("Section to update",section_to_update);
  
    const new_task = {
      id: task_id, // I check the ID of the new task. 
      name: 'New Task'
    }
    console.log("New task",new_task);
    section_to_update.tasks.push(new_task); // Add the new task to the tasks array in the section
  
    //Notice how I manipulated section:to_update, which was defined with find. When modified,
    //it also modifies the original object json_object_database because it is a reference.
  
    //4. I need to conver the JS object back to a JSON strinhg and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2);
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
  
    //5. Finally, we acknoledge that the task was added succesfully
    console.log("Task deleted ",section_id + " " + task_id);
    res.status(201).json({ message: section_id + ' ' + task_id + ' added successfully!' }); //Status 201 indicates "Created"
    
};

//PUT: Update a task in a section (PUT('/api/sections/:section_id/tasks/:task_id')
const updateTask = async (req, res) => {
    console.log('Put request received to update a task in a section.');
  
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
    const task_id = req.params.task_id; // Extract the task ID from the request parameters
    const new_task_name = req.body.name; // Extract JSON received from the request body
    console.log("New task name",new_task_name);
    //1. I need to read the file and see if it exists
    //const json_string_database = await read_json_file_database(); // Read the file asynchronously
    const json_string_database = req.jsonData; // Use the JSON data from the middleware

    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object
  
    //3. I need to find the section that contains the task and update the task name
    const section_to_update = json_object_database.sections.find(section => String(section.id) === String(section_id));
    //console.log("Section to update",section_to_update);
  
    const task_to_update = section_to_update.tasks.find(task => String(task.id) === String(task_id));
    //console.log("Task to update",task_to_update);
  
    task_to_update.name = new_task_name; // Update the task name
  
    //4. I need to conver the JS object back to a JSON strinhg and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2);
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
  
    //5. Finally, we acknoledge that the task was updated succesfully
    console.log("Task deleted ",section_id + " " + task_id);
    res.status(200).json({ message: section_id + ' ' + task_id + ' updated successfully!' }); //Status 200 indicates "OK"
    
};


//DELETE: Delete a task from a section (DELETE('/api/sections/:section_id/tasks/:task_id')
const deleteTask = async (req, res) => {
    console.log('Delete request received to delete a task from a section.');
  
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
    const task_id = req.params.task_id; // Extract the task ID from the request parameters
  
    //1. I need to read the file and see if it exists
    const json_string_database = req.jsonData; // Use the JSON data from the middleware

    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object
  
    //3. I need to find the section that contains the task and delete the task
    const section_to_update = json_object_database.sections.find(section => String(section.id) === String(section_id));
    //console.log("Section to update",section_to_update);
  
    section_to_update.tasks = section_to_update.tasks.filter(task => String(task.id) !== String(task_id)); // Filter out the task with the given ID
  
    //4. I need to conver the JS object back to a JSON strinhg and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2);
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
  
    //5. Finally, we acknoledge that the task was deleted succesfully
    console.log("Task deleted ",section_id + " " + task_id);
    res.status(200).json({ message: section_id + ' ' + task_id + ' deleted successfully!' }); //Status 200 indicates "OK"
};

module.exports = {
    createNewTask,
    updateTask,
    deleteTask
};