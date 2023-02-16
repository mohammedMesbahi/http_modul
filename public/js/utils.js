export const formToJson=(idForm)=>{
    let form=document.getElementById(idForm)
    let formData=new FormData(form)
    let datas={}
    formData.forEach((element,ok)=>datas[ok]=element)
    return datas;
}