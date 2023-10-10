// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response

    return res.json(pets);

    // this line just returns a status code  ||  return res.status(200).json(pets)
});

// get pet by owner with query string
app.get('/api/v1/pets/owner/:owner', (req, res) => {
    // get the owner from the request
    // req.params makes a request for the given param which is /:owner using it as a variable
    const owner = req.params.owner;

    // find the pet in the pets array
    // using filter instead of find here because some pets have more than 1 owner
    // pets.find also works but filter is needed to get all the pets
    const pet = pets.filter(pet => pet.owner === owner);

    // send the pet as a response

    // return res.json(pet); 
    // is one way to do this or using status codes as done below

    if (!pet){
        return res.status(404).json({error: 'pet not found'})
    }

    res.status(200).json(pet);

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    return res.json(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
