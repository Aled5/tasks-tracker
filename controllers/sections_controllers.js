//Controllers asociated with sections


//Import Node JS modules
const path = require('path'); 
// const fs = require('fs')
const fs = require('fs').promises;

//Import utils functions
const {write_json_file_database} = require('../utils/json_file_database_functions.js');


//POST: App to create a new section POST('/api/sections/:section_id')
const createNewSection = async (req, res) => { //Notice that I made the function async, so the file is readed asynchronously.
    console.log('Post for adding a section received.');
  
    //1. I need to read the file and see if it exists
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
    //const json_string_database = await read_json_file_database(); // Read the file asynchronously
    const json_string_database = req.jsonData; // Use the JSON data from the middleware
    //console.log("JSON string received",json_string_database);
  
    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object  
    //console.log("JSON object received",json_object_database);
    
    //3. I need to create the new section and add it to the JS object
    
    const new_section = {
      id: section_id,  
      name: "New Section",
      tasks: []
    }
  
    //console.log("New section",json_object_database);
    json_object_database.sections.push(new_section); // Add the new section to the sections array in the JS object
    //console.log("New section",json_object_database);
  
    //4. I need to convert the JS object back to JSON and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2); // Convert the JS object back to a JSON string
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
    
    //console.log("JSON string updated",json_string_database_updated);
  
    //5. Finally, we acknowledge that the request was manged successfully.
    //console.log("Section added",section_id);
    res.status(201).json({ message: section_id + ' added successfully!' }); //Status 201 indicates "Created"
};


//PUT: Update a section (PUT('/api/sections/:section_id')
const updateSection = async (req, res) => {
    console.log('Put request received to update a section.');
  
    //I gather the data that will be used to update the section
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
    const new_section_name = req.body.name; // Extract JSON received from the request body
    
    //1. I need to read the file and see if it exists
    //const json_string_database = await read_json_file_database(); // Read the file asynchronously
    const json_string_database = req.jsonData; // Use the JSON data from the middleware
    //console.log("JSON string received",json_string_database);
  
    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object  
    //console.log("JSON object received",json_object_database);
    
    //3. I need to find the section that needs to be updated according to the ID and update the name
    //console.log("Section ID to update",section_id);
    //console.log("Sections in the database",json_object_database.sections);
    const section_to_update = json_object_database.sections.find(section => String(section.id) === String(section_id));
    //console.log("Section to update",section_to_update);
  
    section_to_update.name = new_section_name;
    //console.log("JSON object updated",json_object_database);
  
    //Important: Notice how I manipulated section:to_update, which was defined with find. When modified,
    //it also modifies the original object json_object_database because it is a reference.
  
    //4. I need to conver the JS object back to a JSON strinhg and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2);
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
  
    //5. Finally, we acknoledge that the section was updated succesfully
    //console.log("Section updated",section_id);
    res.status(200).json({meassage: section_id + ' updated successfully!'});
  
};

//DELETE: Delete a section (DELETE('/api/sections/:section_id')
const deleteSection = async (req, res) => {
    console.log('Delete request received to delete a section.');
  
    const section_id = req.params.section_id; // Extract the section ID from the request parameters
  
    //1. I need to read the file and see if it exists
    //const json_string_database = await read_json_file_database(); // Read the file asynchronously
    const json_string_database = req.jsonData; // Use the JSON data from the middleware
    //console.log("JSON string received",json_string_database);
  
    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object  
    //console.log("JSON object received",json_object_database);
    
    //3. I filter the section that I want to delete from the array of sections and I update the array of sections
    //console.log("Section ID to delete",section_id);
    json_object_database.sections = json_object_database.sections.filter(section => String(section.id) !== String(section_id)); // Filter out the section with the given ID
    
    //4. I need to conver the JS object back to a JSON strinhg and write it to the file
    const json_string_database_updated = JSON.stringify(json_object_database, null, 2);
    //console.log("JSON string updated",json_string_database_updated);
  
    await write_json_file_database(json_string_database_updated)
  
    //5. Finally, we acknoledge that the section was deleted succesfully
    //console.log("Section deleted",section_id);
    res.status(200).json({meassage: section_id + ' deleted successfully!'});

};

//GET: App to get all sections (GET('/api/sections')
const getAllSections = async (req, res) => {

    console.log('Get request received to get all sections.');
  
    //1. I need to read the file and see if it exists
    const json_string_database = req.jsonData; // Use the JSON data from the middleware
    //console.log("JSON string received",json_string_database);
  
    //2. I need to convert the JSON to a JS object
    const json_object_database = JSON.parse(json_string_database); // Parse the JSON string into a JavaScript object  
    //console.log("JSON object received",json_object_database);
    
    //3. I send the sections array in the response
    res.status(200).json(json_object_database.sections); // Send the sections array as a JSON response
    console.log("Sections sent",json_object_database.sections);
  
};
  
module.exports = {
    createNewSection,
    updateSection,
    deleteSection,
    getAllSections
};