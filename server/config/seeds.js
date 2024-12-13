const db  = require('./connection');
const { User, Movie }  = require("../models");
// import fs module from node to read the movie JSON data
const fs = require('fs');
const path = require('path');

db.once('open', async () => {
    let userCheck = await db.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await db.dropCollection('users');
    }

    await User.insertMany([
      {
        username: "JoeJoe",
        email: "joejoe@mail.com",
        password: "password1",
      },
      {
        username: "TheFool",
        email: "thefool@mail.com",
        password: "password2",
      },
    ]);

    console.log('users seeded!');

    let movieCheck = await db.db.listCollections({ name: 'movies' }).toArray();
    if (movieCheck.length) {
      await db.dropCollection('movies');
    }
    // parse JSON movie data
    const movieData = JSON.parse(fs.readFileSync(path.join(__dirname, 'movies.json'), 'utf8'));
    
    await Movie.insertMany(movieData);

    console.log('movies seeded!');

    process.exit(0);
})