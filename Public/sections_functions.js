//*** Functions associated with Sections ***//

//* Functions associated with the communication with the server *//

async function fetchSections() {
    try {
        const response = await fetch('http://localhost:5000/api_sections/sections', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data; // Return the fetched sections
    } catch (error) {
        console.error('Error fetching sections:', error);
        return []; // Return an empty array in case of error
    }
}
async function postSectionToDatabase(new_section, new_section_id) {
    try {
        const response = await fetch(`http://localhost:5000/api_sections/sections/${new_section_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ section: new_section })
        });
        const data = await response.json();
        console.log('Section posted:', data);
    } catch (error) {
        console.error('Error posting section:', error);
    }
}
async function removeSectionFromDatabase(sectionId) {
    try {
        const response = await fetch(`http://localhost:5000/api_sections/sections/${sectionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Section removed:', data);
    } catch (error) {
        console.error('Error removing section:', error);
    }
}

async function putUpdateSectionInDatabase(sectionId, sectionName) {
    try {
        const response = await fetch(`http://localhost:5000/api_sections/sections/${sectionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'name':sectionName })
        });
        const data = await response.json();
        console.log('Section updated:', data);
    } catch (error) {
        console.error('Error updating section:', error);
    }
}

//* Fuctions to fetch and add to the DOM the Sections from the server. *//

async function loadSections() {
    const data = await fetchSections();
    console.log(data);
    //return data; I cannot return the data because otherwise I would be returning the promise
    //So anything that I would do with the data fetched, I would have to do it inside the function.

    //data is already an array of objects as I used .json in the function,
    // each object is a Section, I do not need to convert it to an object.

    if(data.length > 0){
        for (let i = 0; i < data.length; i++) {
            const section = data[i];
            new_section_data_fetched(data[i])

        }
    }

  }

//To create a new Section in the front-end from the data fetched from the server.
function new_section_data_fetched(data){
    
    //1.target the main element where I will add the section.
    const main_element = document.querySelector('main');

    //2. Create a new section
    const new_section = document.createElement('section');
    new_section.setAttribute('id', data.id);

    //Cross button
    const new_cross_button = document.createElement('button');
    new_cross_button.textContent = 'x';
    new_cross_button.classList.add('cross-button-section');
    new_cross_button.title = 'Remove this Section';

    // Create a new div to hold the button
    const new_div_buttons_section = document.createElement('div');
    new_div_buttons_section.appendChild(new_cross_button);

    //Create a span section to held the title of the section
    const new_span_section = document.createElement('span');
    new_span_section.textContent = data.name;
    new_span_section.setAttribute('contenteditable', 'true');

    //Create break line
    const br = document.createElement('br');
    
    //Create unordered list to hold the tasks
    const ul = document.createElement('ul');
    
    //Create a + button to add a new task to the section
    const new_plus_button = document.createElement('button');
    new_plus_button.textContent = '+';
    new_plus_button.classList.add('plus-button-task');
    new_plus_button.title = 'Add a new Task';

    //**Create the new section adding the different elements created
    new_section.appendChild(new_div_buttons_section);
    new_section.appendChild(new_span_section);
    new_section.appendChild(br);
    new_section.appendChild(ul);
    new_section.appendChild(new_plus_button);

    //5. Add the event listeners required to the elements of the sections
    new_cross_button.addEventListener('click',removeSection);
    new_span_section.addEventListener('blur', updateSection);
    new_plus_button.addEventListener('click', addTask);

    //**Add the section to the main element, above the plus button at the end of the main element.
    last_element = main_element.lastElementChild;

    main_element.insertBefore(new_section,last_element);

}



//* Functions asociated with event listeners *//  

//Function to add a new section in the front-end and to the database
async function addSection(){
    
    //1. Target the main element where I will add the section.
    const main_element = document.querySelector('main');

    //2. A need to target the current section
    const current_section = this.parentElement.parentElement;

    //3. Create the new section to be added. 
    const new_section = document.createElement('section');
    
    let newSectionId; //I need to declare this variable outside the if statement, 
    // so I can used it outside it.

    const allSections = document.querySelectorAll('main section');

    if (allSections.length > 0) {
        //I create the new section's id, according to the id of the previous section.
        const lastSection = allSections[allSections.length - 1];
    
        const lastSectionId = lastSection.getAttribute('id');
        newSectionId = 's' + (Number(lastSectionId.substring(1)) + 1);
        new_section.setAttribute('id', newSectionId);
    }else{
        newSectionId = 's1';
        new_section.setAttribute('id', newSectionId);
    }
    //Cross button
    const new_cross_button = document.createElement('button');
    new_cross_button.textContent = 'x';
    new_cross_button.classList.add('cross-button-section');
    new_cross_button.title = 'Remove this Section';

    // Create a new div to hold the button
    const new_div_buttons_section = document.createElement('div');
    new_div_buttons_section.appendChild(new_cross_button);

    //Create a span section to held the title of the section
    const new_span_section = document.createElement('span');
    //new_span_section.textContent = 'New Section';
    new_span_section.setAttribute('contenteditable', 'true');
    
    //Create break line
    const br = document.createElement('br');

    //Create unordered list to hold the tasks
    const ul = document.createElement('ul');

    //Create a + button to add a new task to the section
    const new_plus_button = document.createElement('button');
    new_plus_button.textContent = '+';
    new_plus_button.classList.add('plus-button-task');
    new_plus_button.title = 'Add a new Task';

    //**Create the new section adding the different elements created
    new_section.appendChild(new_div_buttons_section);
    new_section.appendChild(new_span_section);
    new_section.appendChild(br);
    new_section.appendChild(ul);
    new_section.appendChild(new_plus_button);

    //5. Add the required event listeners to the elements of the section
    new_cross_button.addEventListener('click',removeSection);
    new_span_section.addEventListener('blur', updateSection);
    new_plus_button.addEventListener('click', addTask);

    //6. Add the new section at the end of the main element, above the plus button at the end of the main element.
    last_element = main_element.lastElementChild;
    main_element.insertBefore(new_section,last_element);

    //console.log(newSectionId);
    
    //7. Focus the new section created, so the user can edit it.
    new_span_section.focus();
    
    //Additionally, I need to post the new section in the database
    await postSectionToDatabase('New Section', newSectionId);

};
      
//Function to remove a section from the front-end and from the database
async function removeSection(){
    // Get all sections
    const allSections = document.querySelectorAll('main section');

    //8. A need to target the current section
    //if (allSections.length > 1) {
    const section_to_remove = this.parentElement.parentElement;
    //I need to remove the section from the database
    const sectionId = section_to_remove.getAttribute('id');
    await removeSectionFromDatabase(sectionId);
    section_to_remove.remove();
    //}

}

//Function to update a section in the database, once it was updated in the front-end
async function updateSection() {
    // Get the section name from the span element
    const sectionName = this.textContent;
    // Get the section ID from the parent section element
    const sectionId = this.parentElement.getAttribute('id');
    // Put the updated section name to the database
    await putUpdateSectionInDatabase(sectionId, sectionName);
}