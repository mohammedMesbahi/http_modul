import { todos,title,complatedList,btnSubmitTodo, loginForm, loginTitle, logoutBtn, registerForm, urlApi } from "./config.js";
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
    Array.prototype.slice.call( todos.children ).forEach(element => {
        element.remove()
    });
    window.location.hash=""
    checkAuth()
})
btnSubmitTodo.addEventListener('click',(e)=>{
    console.log(title.value,complatedList.value)
    e.preventDefault();
    fetch('todos/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({completed:complatedList.value,title:title.value})
    }).then((res)=>{
        return res.json()
    })
    .then((data) => {
        const divTodo = document.createElement('div');
        divTodo.classList.add('todo')
        const h1 = document.createElement('p');
        const span = document.createElement('span');
        h1.textContent = data.title
        span.textContent = data.completed
        console.log(data)
        divTodo.appendChild(h1)
        divTodo.appendChild(span)
        todos.appendChild(divTodo)
    })
    .catch(err => {

    })
    const loadTodos = async () => {
        try {
          const res = await fetch('http://localhost:3000/todos');
          const todos = await res.json();
          for (const ele of todos) {
            const divTodo = document.createElement('div');
            divTodo.classList.add('todo')
            const h1 = document.createElement('h1');
            const span = document.createElement('span');
            h1.textContent = ele.title
            span.textContent = ele.completed
            console.log(data)
            divTodo.appendChild(h1)
            divTodo.appendChild(span)
            todos.appendChild(divTodo)
          }
        } catch (err) {
          alert('error at loading todos');
          console.log('[load todos]: ' + err);
        }
      }
})