/*
Todo {
title : string ,
description : string , 
completed : boolean 

}


*/ 
require('dotenv').config();
const mongoose = require("mongoose");
//mongodb+srv://dushyantmathur08:eWgw0BOB2NbODgbg@cluster0.2o4dd.mongodb.net/      
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));



const TodoSchema = new mongoose.Schema({
   title : String ,
   description : String , 
   completed : Boolean

})

const Todo = mongoose.model('todos',TodoSchema);
module.exports = {
    Todo 
}