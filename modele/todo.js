
const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: String,
    complite: {
        type: Boolean,
        default: false
            
      
    }
})

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo