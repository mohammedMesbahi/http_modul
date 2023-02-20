export const urlApi="http://localhost:3000/"
export const authApp=document.getElementById("authApp")
export const todoApp=document.getElementById("todoApp")
export const  loginComponent=document.getElementById("loginComponent")
export const loginForm=document.getElementById("loginForm")
export const registerForm=document.getElementById("registerForm")
export const  registerComponent=document.getElementById("registerComponent")
export const logoutBtn=document.getElementById("logoutBtn")
export const loginTitle=document.getElementById("loginTitle")
export const todos=document.querySelector(".todos")
export const btnSubmitTodo = document.getElementById('btnSubmitTodo')
export const title = document.getElementById('title')
export const complatedList = document.getElementById("complated")
export const loadTodos = async () => {
    try {
      const res = await fetch('http://localhost:3000/todos');
      const restodos = await res.json();
      for (const ele of restodos) {
        const divTodo = document.createElement('div');
        divTodo.classList.add('todo')
        const h1 = document.createElement('p');
        const span = document.createElement('span');
        h1.textContent = ele.title
        span.textContent = ele.completed
        divTodo.appendChild(h1)
        divTodo.appendChild(span)
        todos.appendChild(divTodo)
      }
    } catch (err) {
      alert('error at loading todos');
      console.log('[load todos]: ' + err);
    }
  }