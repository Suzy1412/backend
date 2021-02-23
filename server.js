const express = require("express")
const mongoose = require("mongoose")


const app = express()
app.use(express.json())

const db = "mongodb://localhost:27017/fullstack-app";

mongoose.connect(db, ({ useNewUrlParser: true, useUnifiedTopology: true }))
  .then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err))


  const todoSchema = new mongoose.Schema({
      titel: String,
      complite: {
          type: Boolean,
          default: false
              
        
      }
  })
  
  const Todo = mongoose.model('todo', todoSchema)

  app.get("/todos", (req,res) => {
      Todo.find().then(todo => res.json(todo))
  })

  app.post("/todos" , (req,res) => {
      const newTodo = new Todo({
          title: req.body.title
      })
      newTodo.save().then(todo => res.json(todo))
  })

  app.delete("/todos", (req,res) => {
    Todo.findByIdAndDelete(req.params.id)
    .then(() => res.json({remove: true}))
})


app.listen(5000, () => {
    console.log("Server is running at port 5000");
});