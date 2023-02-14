const express = require('express')
const fs = require('fs')
const bcrypt = require('bcrypt')
const bd=JSON.parse(fs.readFileSync("./database.json").toString())


const router = express.Router();
router.get("/",(req,res)=>{
    let limit=req.query.limit || bd.todos.length
    const datas=bd.users.filter((element,index)=>index<limit)
    res.json(datas)
})

router.post("/register",async (req,res)=>{
    const {login,pwd}= req.body
    if(!login || !pwd)
        return res.status(400).send("login and pwd are required")
    let user = bd.users.find(element=>element.login==login)
    if(user)
        return res.status(400).send("login already exists")
    
    let hashPwd= await bcrypt.hash(pwd,10);
    
    let newUser = {
        login, pwd:hashPwd
    }
    bd.users.push(newUser)
    fs.promises.writeFile("./database.json",JSON.stringify(bd,null,4))
    .then(()=>res.json({message:"register success"}))
    .catch(err=>{
        console.log(err)
        bd.users.pop();
        res.status(500).json({message:"please try again later"})
    })
})

router.post("/login",async (req,res)=>{
    const {login,pwd}= req.body
    if(!login || !pwd)
        return res.status(400).send("login and pwd are required")
    
        let user = bd.users.find(element=>element.login==login)
    if(!user)
        return res.status(404).send("not found")
    
    if(await bcrypt.compare(pwd,user.pwd))
        {
            req.session.isConnected=true;
            req.session.user=user
            return res.json({message:"success"})
        }
    res.status(400).send("invalid credentiels")  
    
})
module.exports=router