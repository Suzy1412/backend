const express = require("express")
const mongoose = require("mongoose")
const Todo = require("./modele/todo")
const Nutzer = require("./modele/nutzer")
const { check } = require('express-validator')
const { validationResult } = require('express-validator')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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
 

const NutzerPostController = async (req, res, next) => {
    console.log(req.body);
	try { 
		const errors = validationResult(req)
		 if(!errors.isEmpty()) {
			
			return res.status(422).json({
				fehlerBeiValidierung: errors.array() 
			})
		} 
		const aufnahme = await Nutzer.create(req.body)
		res.status(200).send(aufnahme);
		
	} catch (fehler) {
		next(fehler)
	}
}

let valideDatenNutzer = [
   check('name').not().isEmpty().withMessage('Name muss eingegeben werden'),
   check('password', 'Passwor muss man als Nummer schreiben').not().isEmpty().isNumeric(),
   check('email', 'In Email muss man @ und .com haben').not().isEmpty().isEmail()

]

app.post("/nutzer", valideDatenNutzer, NutzerPostController)




  app.delete("/todos/:id", (req,res) => {
      Todo.findByIdAndDelete(req.params.id)
      .then(()=> res.json({remove:true}))
  })


app.listen(5000, () => {
    console.log("Server is running at port 5000");
});