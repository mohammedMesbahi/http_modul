import { loginForm, urlApi } from "./config.js";
import { checkAuth } from "./router.js";
import { formToJson } from "./utils.js";

loginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    try{
    let response =await fetch(urlApi+"users/login",{
        method:"POST",
        body:JSON.stringify(formToJson('loginForm')),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok)
        {
           return checkAuth(); 
        }
    let res=  await response.json()
    alert(res.message)
    }
    catch(e)
    {
        console.log(e)
        alert("error")
    }
})