document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector("#add_task").disabled=true;
    document.querySelector("#new_task").onkeyup = () =>{
        if (document.querySelector('#new_task').value.length>0) {
            document.querySelector("#add_task").disabled=false;
        } else {
            document.querySelector("#add_task").disabled=true;
        }
    }
})