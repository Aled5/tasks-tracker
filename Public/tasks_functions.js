//*** Functions associated with Tasks ***//

//* Functions associated with the communication with the server *//

async function post_new_task_database(section_id, task_id) {

    try{
        const response = await fetch('/api_tasks/sections/'+ section_id +'/tasks/' + task_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Task posted:', data);
    }
    catch (error) {
        console.error('Error:', error);
    }

}

async function put_update_task_database(section_id, task_id, task_name) {
    try{
        const response = await fetch('/api_tasks/sections/'+ section_id +'/tasks/'+ task_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: task_name })
        });
        const data = await response.json();
        console.log('Task updated:', data);
    }
    catch (error) {
        console.error('Error:', error);
    }

}

async function delete_task_database(section_id, task_id) {
    try{
        const response = await fetch('/api_tasks/sections/'+ section_id +'/tasks/'+ task_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Task deleted:', data);
    }
    catch (error) {
        console.error('Error:', error);
    }

}

//* Fuctions to fetch and add to the DOM the Tasks from the server. *//

async function loadTasks() {
    const data = await fetchSections(); //I am getting the tasks when I fetch the sections
    //console.log(data);

    //I need to parse all the sections in the front-end
    const sections_front_end = document.querySelectorAll('section');

    for (let i = 0; i < sections_front_end.length; i++) {
        const section_front_end = sections_front_end[i];
        const section_front_end_id = section_front_end.id;
        
        //For each section, I need to get the tasks from the data and append them to the section
        //To get the tasks of the given section according to the id in the front-end
        const tasks_in_data_for_section_id = data.find(section => String(section.id) === String(section_front_end_id)).tasks;
        //console.log(tasks_in_data_for_section_id);

        //To add the tasks to the front-end I need to iterate over each task 
        for (let j=0; j < tasks_in_data_for_section_id.length; j++) {

            //console.log("Adding tasks to front-end.");
            const task = tasks_in_data_for_section_id[j];
            add_task_to_section_in_front_end(task, section_front_end_id);

        }
    }
    
}

//To create a new Task in the front-end from the data fetched from the server.
function add_task_to_section_in_front_end(task, section_id) {
    
    //1. Get the section element according to the id
    const section_element = document.getElementById(section_id);

    //2. Get the unordered list element inside the section
    const ul_element = section_element.querySelector('ul');

    //3. Create the item to be append to the list
    const li_new_element = document.createElement('li');
    const span_new_element = document.createElement('span');
    const button_new_element = document.createElement('button');
    
    li_new_element.appendChild(span_new_element);
    li_new_element.appendChild(button_new_element);

    //4. Set the text content of the span to the input value
    span_new_element.textContent = task.name;
    span_new_element.setAttribute('id', task.id);
    span_new_element.setAttribute('contenteditable', 'true');
    span_new_element.addEventListener('blur', update_task); // Add an event listener to the span element to update the task when it is blurred

    //5. Set the text content of the button to 'Delete'
    button_new_element.textContent = 'x';
    button_new_element.setAttribute('class', 'cross-button-task');
    button_new_element.setAttribute('title', 'Remove this Task');

    //8. Append the list item to the original unordered list in the HTML file
    ul_element.appendChild(li_new_element);

    //9. Add an event listener to the button and a function to remove the list item when clicked
    button_new_element.addEventListener('click',remove_task);

}

//* Functions asociated with event listeners *//  

//Function to add a new task in the front-end and to the database
function addTask() {
    
    const button_clicked = this; // Get the button that was clicked
    const parent_element = button_clicked.parentElement;
    const ul_parent_list = parent_element.querySelector('ul'); // Get the unordered list

    //4. Create three new elements a <li>, a <span> and a <button>
    const li_new_element = document.createElement('li');
    const span_new_element = document.createElement('span');
    const button_new_element = document.createElement('button'); 

    //5. Append the span and the button as children of the list item.
    li_new_element.appendChild(span_new_element);
    li_new_element.appendChild(button_new_element);

    //6. Set the text content of the span to the input value
    span_new_element.setAttribute('contenteditable', 'true');

    let newTaskId; //I need to declare the variable outside the if statement to be able to use it 
    // in the rest of the function.

    all_tasks = ul_parent_list.querySelectorAll('li span'); // Get all the span elements in the list

    if (all_tasks.length > 0) {
        //I need to add the id to the span element according to the last task in the list
        const lastTask = all_tasks[all_tasks.length - 1]; // Get the last task in the list
        const lastTaskId = lastTask.getAttribute('id');

        newTaskId = 't' + (Number(lastTaskId.substring(1)) + 1); 
    
        span_new_element.setAttribute('id', newTaskId); // Set the id of the span element to the number of tasks in the list + 1

    }else{
        newTaskId = 't1'; // Set the id of the span element to 1
        span_new_element.setAttribute('id', newTaskId); // Set the id of the span element to 1
    }

    span_new_element.addEventListener('blur', update_task); // Add an event listener to the span element to update the task when it is blurred

    //7. Set the text content of the button to 'Delete'
    button_new_element.textContent = 'x';
    button_new_element.setAttribute('class', 'cross-button-task'); 
    button_new_element.setAttribute('title', 'Remove this Task'); 
    
    //8. Append the list item to the original unordered list in the HTML file
    ul_parent_list.appendChild(li_new_element);
    
    //9. Add an event listener to the button and a function to remove the list item when clicked
    button_new_element.addEventListener('click', remove_task);
    
    //10. Focus the input element
    span_new_element.focus();

    //11. I need to add the task to the database (even if it does not have a name yet)
    section_id = parent_element.id; // Get the id of the section
    //console.log("Section id: " + section_id);
    post_new_task_database(section_id, newTaskId);

}

async function update_task() {
    //I need to get the section ID, the task ID and the task name
    const task_name = this.textContent; // Get the task name
    const task_id = this.id; // Get the task id

    const li_element = this.parentElement; 
    const ul_element = li_element.parentElement; 
    section_element = ul_element.parentElement;
    const section_id = section_element.id; // Get the section id

    put_update_task_database(section_id, task_id, task_name)

}

//Function to delete a task from the front-end and from the database
async function remove_task() {

    li_element_aux1 = this.parentElement;
    ul_element_aux1 = li_element_aux1.parentElement; // Get the parent element of the list item
    span_element_aux1 = li_element_aux1.querySelector('span'); // Get the span element of the list item
    task_id_aux1 = span_element_aux1.id; // Get the id of the span element

    section_element_aux1 = ul_element_aux1.parentElement;
    section_id_aux1 = section_element_aux1.id; // Get the id of the section
    
    delete_task_database(section_id_aux1, task_id_aux1);

    ul_element_aux1.removeChild(li_element_aux1);
}
