const mongoose = require('mongoose')

// Make a Schema

const fruitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    readyToEat: Boolean
})

// Make a model from the Schema

const Fruit = mongoose.model('Fruit', fruitSchema)


// Export the model for use in the app

module.exports = Fruit