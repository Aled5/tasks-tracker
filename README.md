# Task Tracker App

A full-stack web application for managing tasks and sections, built with Node.js, Express, and vanilla JavaScript. The app allows users to create, update, and delete sections and tasks, with data persisted in a JSON file. It features a clean, dark-themed UI with real-time updates and RESTful APIs for CRUD operations.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [API Documentation](#api-documentation)

## Features
- Create, update, and delete sections and tasks dynamically.
- Interactive frontend with content-editable fields for real-time task and section name updates.
- RESTful API for managing sections and tasks.
- Persistent data storage using a JSON file.
- Modular backend with separated controllers, routes, and middlewares.

## Technologies
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON file (with `fs.promises` for async operations)

## Setup
Follow these steps to run the Task Tracker App locally:

### Installation
1. Clone the repository:
   git clone https://github.com/your-username/task-tracker.git
   cd task-tracker
2. Install dependencies:
   npm install
3. Start the server:
   node app.js
   or
   npm start with Nodemon
4. Open your browser and navigate to `http://localhost:5000`.

### Project Structure

task-tracker/
├── Public/
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   ├── sections_functions.js  # Frontend logic for sections
│   ├── tasks_functions.js     # Frontend logic for tasks
├── controllers/
│   ├── sections_controllers.js  # Backend logic for sections
│   ├── tasks_controllers.js     # Backend logic for tasks
├── routes/
│   ├── sections_routes.js  # API routes for sections
│   ├── tasks_routes.js     # API routes for tasks
├── utils/
│   ├── json_file_database_functions.js  # Utility functions for JSON file operations
├── middlewares/
│   ├── middlewares.js      # Middleware for loading JSON data
├── app.js                  # Express server setup
├── package.json           # Project dependencies and scripts
├── README.md              # This file

## API Documentation
The app provides RESTful API endpoints for managing sections and tasks. All endpoints are prefixed with `/api_sections` or `/api_tasks`.

### Sections Endpoints
- **GET /api_sections/sections**
  - Retrieve all sections.
  - Response: `200 OK` with an array of sections.
- **POST /api_sections/sections/:section_id**
  - Create a new section with the given `section_id`.
  - Response: `201 Created` with `{ message: "section_id added successfully!" }`.
- **PUT /api_sections/sections/:section_id**
  - Update the name of a section.
  - Body: `{ "name": "New Section Name" }`
  - Response: `200 OK` with `{ message: "section_id updated successfully!" }`.
- **DELETE /api_sections/sections/:section_id**
  - Delete a section by `section_id`.
  - Response: `200 OK` with `{ message: "section_id deleted successfully!" }`.

### Tasks Endpoints
- **POST /api_tasks/sections/:section_id/tasks/:task_id**
  - Create a new task in a section.
  - Response: `201 Created` with `{ message: "section_id task_id added successfully!" }`.
- **PUT /api_tasks/sections/:section_id/tasks/:task_id**
  - Update the name of a task.
  - Body: `{ "name": "New Task Name" }`
  - Response: `200 OK` with `{ message: "section_id task_id updated successfully!" }`.
- **DELETE /api_tasks/sections/:section_id/tasks/:task_id**
  - Delete a task from a section.
  - Response: `200 OK` with `{ message: "section_id task_id deleted successfully!" }`.
