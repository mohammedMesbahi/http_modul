const express = require('express')

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("get router 1")
})
router.get("/:id",(req,res)=>{
    res.send("get router 1")
})
router.post("/",(req,res)=>{
    res.send("post router 1")
})
module.exports=router