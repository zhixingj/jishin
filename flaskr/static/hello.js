window.addEventListener('load', event=>{
    document.addEventListener('mousedown', startDrawing);
    document.addEventListener('mousemove', draw);
    document.addEventListener('mouseup', stopDrawing);
    
})

var block = null;
var coord = {x:0, y:0}; //initial mouse coord
var paint = false;
var startCorner = {x:0,y:0};
const svg = d3.select('#svg');

function getPosition(event) {
    coord.x = event.pageX+document.body.scrollLeft;
    coord.y = event.pageY+document.body.scrollTop;
}
function startDrawing(event) {
    paint = true;
    getPosition(event);

    let top = pxToVh(coord.y);
    var rect = svg.append('rect').attr('x',pxToVw(coord.x)+'vw').attr('y', top+'vh');

    block = document.createElement('div');
    block.className = 'block';
    block.style.top = top+'vh';
    startCorner.x = 24.6+'vw';
    startCorner.y = top;
    document.body.appendChild(block);
}

function draw(event) {
    if (!paint){
        return;
    }
    getPosition(event);
    let width = pxToVw(coord.x) - parseInt(startCorner.x);
    let height = pxToVh(coord.y) - parseInt(startCorner.y);

    rect.attr('x', width+'vw').attr('y', height+'vh');
    
    block.style.width=width+'vw';
    block.style.height=height+'vh';
    console.log("drawing");
}

function stopDrawing(event){
    paint=false;

}

function pxToVw(px) {
    return px*(100/document.documentElement.clientWidth);
}

function pxToVh(px) {
    return px*(100/document.documentElement.clientHeight);
}



