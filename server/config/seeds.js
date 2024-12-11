const db  = require('./connection');
const User  = require("../models");

db.once('open', async () => {
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