const mongoose = require("mongoose")

const nutzerSchema = new mongoose.Schema({
    name: String,
    password: Number,
    email: String
})

const Nutzer = mongoose.model('Nutzer', nutzerSchema)

module.exports = Nutzer