window.addEventListener('load', event=>{
    svg = d3.select('#svg');
    svg.on('mousedown', startDrawing);
    // document.addEventListener('mousemove', draw);
    svg.on('mousemove', draw);
    svg.on('mouseup', stopDrawing);
    
})

var block = null;
var coord = {x:0, y:0}; //initial mouse coord
var paint = false;
var startCorner = {x:0,y:0};
var rect = null;

function getPosition(event) {
    coord.x = event.pageX+document.body.scrollLeft;
    coord.y = event.pageY+document.body.scrollTop;
}
function startDrawing(event) {
    console.log('started drawing');
    paint = true;
    // getPosition(event);

    let top = pxToVh(d3.event.pageY);
    console.log(`rect: ${rect}`);
    //     block = document.createElement('div');
    //     block.className = 'block';
    //     block.style.top = top+'vh';
    startCorner.x = 24+'vw';
    startCorner.y = top;
    rect = svg.append('rect').attr('x',startCorner.x).attr('y', top+'vh').style('fill',"cornflowerblue");
//     document.body.appendChild(block);
// }
}
function draw(event) {
    if (!paint){
        return;
    }

    // getPosition(event);
    let width = pxToVw(d3.event.pageX) - parseInt(startCorner.x);
    let height = pxToVh(d3.event.pageY) - parseInt(startCorner.y);

    rect.attr('width', width+'vw').attr('height', height+'vh');
    
    // block.style.width=width+'vw';
    // block.style.height=height+'vh';
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