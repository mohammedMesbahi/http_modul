const express = require("express")
const app = express()
const port = 3000

/*app.get("/todos/:idTodo/:nbr/:name",(req,res)=>{ // middleware
    let idTodo=req.params.idTodo
    let nbr=req.params.nbr
    let name=req.params.name
    res.send(idTodo+nbr+name)
})*/
app.use(express.json())
app.use("/todos",(req,res,next)=>{
    res.send("ok")
})
/*app.get("/todos",(req,res)=>{ // middleware
    const {limit,page}=req.query

    res.status(200).send(limit+page+"ok")
})*/
app.post("/todos",(req,res)=>{ // middleware
    console.log("in post")
    console.log(req.body)
    res.json(req.body)
})

app.use((req,res)=>{
    res.status(404).json({message:"404 not found"})
})
app.listen(port,()=>{
    console.log("server started at localhost: " + port)
})