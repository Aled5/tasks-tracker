//Routers asociated with sections
const express = require('express');
const router = express.Router();


//Import Controllers associated with sections
const { 
    createNewSection, 
    updateSection, 
    deleteSection, 
    getAllSections  
 } = require('../controllers/sections_controllers.js');


//POST: App to create a new section POST('/api/sections/:section_id')
router.post('/sections/:section_id', createNewSection);

//PUT: Update a section (PUT('/api/sections/:section_id')
router.put('/sections/:section_id', updateSection);
  
//DELETE: Delete a section (DELETE('/api/sections/:section_id')
router.delete('/sections/:section_id', deleteSection);

//GET: App to get all sections (GET('/api/sections')
router.get('/sections', getAllSections);
  
//Alternative sintax for the above routes
//router.route('/:section_id').post(createNewSection).delete(deleteSection).put(updateSection);
//router.route('/').get(getAllSections);

module.exports = router;