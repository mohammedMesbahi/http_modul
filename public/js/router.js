import { urlApi, authApp, todoApp, registerComponent, loginComponent, loginTitle } from "./config.js";
let isConnected;

export let checkAuth = async ()=>{
    let data= await (await fetch(urlApi+"users/isConnected")).json()
    isConnected=data.isConnected
    if(isConnected)
    {
        todoApp.classList.remove("hidden")
        authApp.classList.add("hidden")
        loginTitle.innerText=data.name;
    }
    else{
        authApp.classList.remove("hidden")
        todoApp.classList.add("hidden")
        loginTitle.innerText="";
    }
    
}
checkAuth();

window.addEventListener('popstate', function (event) {
    checkUrl();
});
const checkUrl=()=>{
    if(isConnected)
    return;
    if(window.location.hash=="#register")
    {
        registerComponent.classList.remove("hidden")
        loginComponent.classList.add("hidden")
    }
    else{
        registerComponent.classList.add("hidden")
        loginComponent.classList.remove("hidden")
    }
}
checkUrl();
