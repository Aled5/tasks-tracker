//Functions to read and write the json file that is used as database

//Import Node JS modules
const path = require('path'); 
// const fs = require('fs')
const fs = require('fs').promises;

async function read_json_file_database() {
  try {
    const filepath = path.join(__dirname, '../json_database.json');
    //const data = await fs.readFileSync(filepath, 'utf-8',);
    data = await fs.readFile(filepath, 'utf-8'); // Read the file asynchronously
    //console.log("Data readed from file",data);
    return data;
  } catch (err) {
    // If file doesn't exist, start with an empty structure
    console.error('Error reading file:', err);
    return '{ "sections": [] }';
  }
}

async function write_json_file_database(data) {
  const variables_filepath = path.join(__dirname, "../json_database.json");
  await fs.writeFile(variables_filepath, data, (err) => { // Write the file asynchronously
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File written successfully!');
    }
  });
}

module.exports = {read_json_file_database, write_json_file_database};


