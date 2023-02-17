import { loginForm, loginTitle, logoutBtn, registerForm, urlApi } from "./config.js";
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



registerForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    let datas=formToJson('registerForm');
    let {pwd1,pwd2}=datas;
    if(pwd1!=pwd2)
        return alert("no match")
    let dataToSend= {
                    login: datas.login, 
                    pwd:pwd1
                };
    try{
    let response =await fetch(urlApi+"users/register",{
        method:"POST",
        body:JSON.stringify(dataToSend),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.ok)
        {
            window.location.hash="login"
            loginForm.elements['login'].value=datas.login;
            return alert("success")
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

logoutBtn.addEventListener('click',async ()=>{
    await fetch("users/logout")
    window.location.hash=""
    checkAuth()
})