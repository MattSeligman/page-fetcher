const fs = require('fs');
const request = require('request');

// Let's start our request.
request('http://www.example.edu', (error, response, body) => {

  // if the status code is accepted return the body.
  if (response.statusCode === (200 || 201)) return downloadComplete(body);

  // otherwise let's send an error.
  return console.log("an error occurred: ", error);
});

// This function is called AFTER the first function's complete so it's able to read the data correctly.
const checkFileSize = (directory)=>{

  fs.stat(directory, (error, statistics) => {
    if (error) {
      console.log(`File doesn't exist.`);
    } else {
      console.log(`Downloaded and saved ${statistics.size} bytes to ${directory}`);
    }
  });
};

// simplify the downloadComplete callback to run when the file is READY.
// Learn't about optional but pre-set variables today so gonna throw that in here too ^-^
const downloadComplete = (content, directory = './index.html')=>{

  // Let's write our file
  fs.writeFile(directory, content, err => {

    // If there's an error let's console it and stop.
    if (err) return console.error(err);

    // Otherwise it's succesfull! Let's let the user know the results.
    checkFileSize(directory);
  });
};