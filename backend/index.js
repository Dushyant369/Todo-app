// write basic express boiler plate code
//with express.json() middleware

require('dotenv').config()
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { Todo } = require("./db");
const cors = require("cors")

const app = express();

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" })); 

//Body {
// title : string ,
//description : string
// }

app.post("/todo" , async function(req,res){
    const createPayload = req.body;  
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs" ,   
        })
        return ;
    }
    //put it in mongo db
   await Todo.create({
        title : createPayload.title ,
        description : createPayload.description,
        completed : false
    })
    res.status(200).json({
        msg : "Todo created"
    })

})

app.get("/todo" , async function(req,res){
   const todos = await Todo.find({})
   res.json({
    todos
   })
   

})

app.put("/completed" , async function(req,res){
    const updatedPayload = req.body ;
    const parsePayload = updateTodo.safeParse(updatedPayload)
     if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs" ,   
        })
        return ;
    }
   
     await Todo.updateOne({
        _id : req.body._id 
    
     }, {
     completed : true 
      }
    )
    res.json({
        msg : "todo marked as completed"
    })
})


app.delete("/todo", async(req,res)=>{
     const deletePayload = req.body ;
    const parsePayload = updateTodo.safeParse(deletePayload)
     if(!parsePayload.success){
        res.status(411).json({
            msg : "You sent the wrong inputs" ,   
        })
        return ;
    }
     try {
    await Todo.deleteOne({_id : req.body._id });
    res.json({ msg: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting todo" });
  }

})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

