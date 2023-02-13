const express = require("express")
const fs = require("fs")
const usersRouter =require("./routes/users.js")
const app = express()
const port = 3000
const bd=JSON.parse(fs.readFileSync("./database.json").toString())
let counter=parseInt(fs.readFileSync("./idCounter.txt").toString())

app.use(express.json()) // global

app.use("/users",usersRouter);



app.get("/todos",(req,res)=>{
    let limit=req.query.limit || bd.todos.length
    const datas=bd.todos.filter((element,index)=>index<limit)
    res.json(datas)
})

app.get("/todos/:id",(req,res)=>{
    let id = req.params.id
    if(isNaN(id))
        return res.status(400).json({message:"please provide a number"})
    let todo=bd.todos.find(element=>element.id==id)
    if(todo)
        res.json(todo)
    else
        res.status(404).json({message:"todo with id = " + id + " not found"})
})

app.post("/todos",(req,res)=>{
    let { userId, title, completed }=req.body
    //verification
    if(!userId || !title || completed==undefined)
        return res.status(400).json({message:"userId, title and completed are required"})
    let data = {userId,title,completed}
    data.id=counter;
    counter++;
    bd.todos.push(data)
    fs.promises.writeFile("./database.json",JSON.stringify(bd,null,4))
    .then(()=>res.json(data))
    .catch(err=>{
        counter--;
        bd.todos.pop();
        res.status(500).json({message:"please try again later"})
    }).finally(()=>{
        fs.writeFileSync("./idCounter.txt",counter+"")
    })
    })

app.delete("/todos/:id",(req,res)=>{
    let id = req.params.id
    if(isNaN(id))
        return res.status(400).json({message:"please provide a number"})
    let todo= bd.todos.find(element=>element.id==id)
    if(!todo)
        return res.status(404).json({message:"not found"})
    bd.todos.splice(bd.todos.indexOf(todo),1);
    fs.promises.writeFile("./database.json",JSON.stringify(bd,null,4))
    .then(()=>res.json(todo))
    .catch(err=>{
        console.log(err)
        bd.todos.push(todo);
        res.status(500).json({message:"please try again later"})
    })
})

app.put("/todos/:id",(req,res)=>{
    let id=req.params.id
    let {userId, title, completed } = req.body
    if(isNaN(id))
        return res.status(400).json({message:"please provide a number"})
    let todo=bd.todos.find(element=>element.id==id)
    if(!todo)
        return res.status(404).json({message:"todo with id = " + id + " not found"})
    
    todo.userId = userId || todo.userId
    todo.title = title || todo.title
    todo.completed = completed==undefined?todo.completed:completed

    fs.promises.writeFile("./database.json",JSON.stringify(bd,null,4))
    .then(()=>res.json(todo))
    .catch(err=>{
        console.log(err)

        res.status(500).json({message:"please try again later"})
    })

})
app.use((req,res)=>{
    res.status(404).json({message:"404 not found"})
})
app.listen(port,()=>{
    console.log("server started at localhost: " + port)
})