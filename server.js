const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./modele/todo")
const Nutzer = require("./modele/nutzer")

const app = express()
app.use(express.json())


const db = "mongodb://localhost:27017/fullstack-app";

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err))



  app.get("/todos", (req,res) => {
      Todo.find().then(todo => res.json(todo))
  })

  app.post("/todos" , (req,res) => {
      const newTodo = new Todo({
          title: req.body.title
      })
      newTodo.save().then(todo => res.json(todo))
  })
  
  app.post("/nutzer" , (req,res) => {
      /*console.log(req.body);
      Nutzer.create(req.body).then(ergebniss => res.json(ergebniss))*/

    const newNutzer = new Nutzer({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    })
    newNutzer.save().then(ergebnissNutzer => res.status(201).json(ergebnissNutzer)).catch(fehler => res.status(500).json({error:fehler}))
})



  app.delete("/todos/:id", (req,res) => {
      Todo.findByIdAndDelete(req.params.id)
      .then(()=> res.json({remove:true}))
  })


app.listen(5000, () => {
    console.log("Server is running at port 5000");
});