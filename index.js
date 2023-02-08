const http=require("http")
const fs=require("fs")

const server = http.createServer((req,res)=>{
    let method=req.method;
    let path=req.url;
    if(method=="GET" && path=="/todos")
    {
        fs.promises.readFile("./database.json")
        .then(data=>{
        res.setHeader("Content-Type","application/json")
        res.write(data.toString())
        res.end();
        }).catch(err=>{
            res.writeHead(500, {"Content-Type": "text/html"});
            res.write("pleasse try again later");
            res.end();
        })
    }
    else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write("not found");
        res.end();
    }
   /* console.log('incoming request')
    let method=req.method;
    let path=req.url;
    res.setHeader("Content-Type","application/json")
    res.write(JSON.stringify({
        method:method,
        path:path
    }))
    res.end()
    */
    /*
    fs.promises.readFile("./public/page.html").
    then(data=>{
        res.setHeader("Content-Type","text/html")
        res.write(data.toString())
        res.end();
    })
    */
  
})
server.listen(3000,()=>{
    console.log('server started')
})