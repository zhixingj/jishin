window.onload = init;

function init() {
    window.addEventListener('mousemove', e => {
        document.getElementById('x-coord').textContent = e.pageX;
        document.getElementById('y-coord').textContent = e.pageY;
    })

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
}