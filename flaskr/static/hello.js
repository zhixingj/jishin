window.addEventListener('load', event=>{
    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', stopDrawing);

    $("#timeLine").mouseover(function () {
        var mousetip_time = document.getElementById('mousetip-time');
        mousetip_time.style.display = "block";
        window.onmousemove = function (e) {
            var x = e.pageX,
                y = e.pageY;
            var timeline_x = document.getElementById('timeLine').getBoundingClientRect().left;
            mousetip_time.style.top = (y - 10) + 'px';
            mousetip_time.style.left = (timeline_x - mousetip_time.clientWidth - 20) + 'px';
        };
    });
    $("#timeLine").mouseout(function () {
        var mousetip_time = document.getElementById('mousetip-time');
        mousetip_time.style.display = "none";
    });
})

var block = null;
var coord = {x:0, y:0}; //initial mouse coord
var paint = false;
var startCorner = {x:0,y:0};

function getPosition(event) {
    coord.x = event.pageX+document.body.scrollLeft;
    coord.y = event.pageY+document.body.scrollTop;
}

function startDrawing(event) {
    paint = true;
    getPosition(event);
    block = document.createElement('div');
    block.className = 'block';
    let top = pxToVh(coord.y);
    block.style.top = top+'vh';
    startCorner.x = 24.6+'vw';
    startCorner.y = top;
    document.body.appendChild(block);
    console.log("started");
}

function draw(event) {
    if (!paint){
        return;
    }
    getPosition(event);
    let width = pxToVw(coord.x) - parseInt(startCorner.x);
    let height = pxToVh(coord.y) - parseInt(startCorner.y);
    block.style.width=width+'vw';
    block.style.height=height+'vh';
    console.log("drawing");
    
}

function stopDrawing(event){
    paint=false;
    // currentBlock.style.width=20;

}

function pxToVw(px) {
    return px*(100/document.documentElement.clientWidth);
}

function pxToVh(px) {
    return px*(100/document.documentElement.clientHeight);
}



