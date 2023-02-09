const http=require("http")
const fs=require("fs")
let idCounter;
idCounter = parseInt(fs.readFileSync("./idCounter.txt").toString())
const bd=JSON.parse(fs.readFileSync("./database.json").toString());
const server = http.createServer((req,res)=>{
    let method=req.method;
    let path=req.url;
    if(method=="GET" && path=="/todos")
    {
        res.setHeader("Content-Type","application/json")
        res.write(JSON.stringify(bd.todos))
        res.end();
       
    }
    else if(method=="POST" && path=="/todos")
    {
        // eventDriven Architecture
        let chunks=[]
        req.on("data",(chunk)=>{
            chunks.push(chunk)
        })
        req.on("end",()=>{
            const parsedBody = Buffer.concat(chunks).toString();
           // verification
           let data;
           try{
            data =JSON.parse(parsedBody);
            }
            catch(e)
            {
                res.writeHead(400, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message:"json format is required"}));
                return res.end();
            }
           const {userId, title, completed} = data;
           if(!userId || !title || !completed)
           {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.write(JSON.stringify({message:"userId, title and completed are required"}));
            return res.end();
           }
           idCounter++;
           
           const dataToSave={
            id:idCounter,
            userId:userId,
            title:title,
            completed:completed
           }
            bd.todos.push(dataToSave)
            fs.promises.writeFile("./database.json",JSON.stringify(bd,null,4))
            .then(()=>{
                fs.writeFileSync("./idCounter.txt",idCounter+"")
                res.writeHead(201, {"Content-Type": "application/json"});
                res.write(JSON.stringify(dataToSave));
                return res.end();
            })
            .catch(err=>{
                console.log(err)
                bd.todos.pop();
                idCounter--;
                res.writeHead(500, {"Content-Type": "application/json"});
                res.write(JSON.stringify({message:"please try again later"}));
                return res.end();
            })
          
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