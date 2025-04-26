// Express JS server

// Importing express module
const express = require('express');
const app = express();

// static
app.use(express.static('./Public'));

// Middleware to parse JSON data from incoming requests
app.use(express.json());

//Import Middlewares
const {loadJSONFileData_Middleware} = require('./middlewares/middlewares.js');

//Import routes
const sectionsRoutes = require('./routes/sections_routes');
const tasksRoutes = require('./routes/tasks_routes');

//Apps
app.use('/api_sections', loadJSONFileData_Middleware, sectionsRoutes); // Routes for sections
app.use('/api_tasks',loadJSONFileData_Middleware, tasksRoutes); // Routes for tasks

// Server setup on port 5000
app.listen(5000, () => {
  console.log('Server is running on port 5000...');
});

