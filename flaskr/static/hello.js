window.addEventListener('mousemove', e=>{
    console.log("2");
    document.getElementById('x-coord').textContent=e.x;
    document.getElementById('y-coord').textContent=e.y;
})

window.onload = drawTimeLine;
function drawTimeLine() {
    var canva = document.getElementById('my_canvas');
    if (canva.getContext('2d')) {
        var ctx = canva.getContext('2d');
        console.log(ctx);

        ctx.beginPath();
        ctx.moveTo(44,221);
        ctx.lineTo(100,100);
        ctx.stroke();

    }
}

