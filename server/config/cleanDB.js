// mod 22 act 26
const models = require("../models");
const db = require("./connection");

module.exports = async (modelName, collectionName) => {
  try {
    let model = await db.db.listCollections({
      name: collectionName,
    }).toArray();

    if(model.length) {
      await db.dropCollection(collectionName);
    }

  } catch (err) {
    throw err;
  }
};
