window.addEventListener('mousemove', e=>{
    console.log("1");
    document.getElementById('x-coord').textContent=e.clientX;
    document.getElementById('y-coord').textContent=e.clientY;
})
