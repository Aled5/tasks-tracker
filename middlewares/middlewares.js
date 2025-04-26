//Middlewares

const {read_json_file_database} = require('../utils/json_file_database_functions.js');

const loadJSONFileData_Middleware = async (req, res, next) => {

    try{
        
        //1. I need to read the file
        const json_string_database = await read_json_file_database(); // Read the file asynchronously
        //console.log("JSON string received",json_string_database);
        
        //2. I attach the JSON object to the request object so it is used by the controllers
        req.jsonData = json_string_database;
        next(); // Call the next middleware or route handler

    }catch(err){
        console.error('Error reading file:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }

}

module.exports = {loadJSONFileData_Middleware};
