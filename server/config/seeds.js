const db  = require('./connection');
const User  = require("../models");
// const cleanDB = require("./cleanDB");


db.once('open', async () => {
    // await cleanDB("users");
    // delete the users collection if it exists
    let userCheck = await db.db.listCollections({ name: 'users' }).toArray();
    if(userCheck.length) {
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

    process.exit(0);
})