const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://0.0.0.0/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(recipe => {
    // update recipe
    console.log('inserted recipe: ', recipe)
    return Recipe.findOneAndUpdate(data[3], { duration: 100 })
  })
  .then(recipe => {
      console.log('updated recipe: ', recipe)
      return Recipe.deleteOne(data[2]);
  })
  .then(deleteInfo => {
    console.log('deleted recipe: ', deleteInfo)
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  })
  .catch(error => console.log(error));
