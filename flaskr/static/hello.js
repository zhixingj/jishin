window.addEventListener('mousemove', e=>{
    console.log("2");
    document.getElementById('x-coord').textContent=e.x;
    document.getElementById('y-coord').textContent=e.y;
})

