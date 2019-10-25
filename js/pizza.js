var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');

var x = 0;
var tickCount = 0;
var isStart = false;

var sprite = new Image();
sprite.src = '../images/sprite.png';
sprite.onload = function () {
    ctx.drawImage(sprite, x, 0, 234, 354, 0, 0, 234, 354);
    tick();
    requestAnimationFrame(tick);
}

window.addEventListener('click', function () {
    isStart = true;
});

function tick() {
    if (isStart) {
        if (tickCount > 3) {
            draw();
            tickCount = 0;
        }

        tickCount += 1;
    }
    requestAnimationFrame(tick);
}


function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    if (x < 1404) {
        x = x + 234;
    } else {
        x = 1404;
    }

    ctx.drawImage(sprite, x, 0, 234, 355, 0, 0, 234, 355);

}