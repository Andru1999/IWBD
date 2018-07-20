var Main = (function() {})();
"use strict"
var requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;

window.onload = () => {
    var canvas = document.getElementById("main_game_canva");
    var ctx = canvas.getContext("2d");
    canvas.width = 2000;
    canvas.height = 1000;
    requestAnimFrame(() => main(canvas, ctx));
    lastTime = Date.now();
    $("#main_canvas").mousedown(mousedown);
    $("body").mouseup(mouseup);
    $("body").mousemove(mousemove);

};

function render(canvas, ctx) {
    if (IsNeedToDraw) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var i3 = 0; i3 < gameWorld._depth; i3++) {
            for (var i1 = 0; i1 < gameWorld._width; i1++) {
                for (var i2 = 0; i2 < gameWorld._height; i2++) {
                    if (gameWorld._state[i1][i2][i3] != undefined)
                        gameWorld._state[i1][i2][i3].draw(ctx, i1 * 32, i2 * 32);
                }
            }
        }
        IsNeedToDraw = false;
    }
}

var lastTime = 0;
var test = 0;

function main(canvas, ctx) {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    test += dt;

    //update(dt);
    if (test > .03) {
        render(canvas, ctx);
        test = 0;
    }
    lastTime = now;
    requestAnimFrame(() => main(canvas, ctx));
};


