var requestAnimFrame = (function()
    {
        return window.requestAnimationFrame       ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame    ||
               window.oRequestAnimationFrame      ||
               window.msRequestAnimationFrame;
    })();

var canvas;
var ctx;

window.onload=()=>
{
    canvas = document.getElementById("main_canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 700;
    canvas.height = 480;
    requestAnimFrame(main);
}

resources.onReady(init);

(function preLoad()
{
    resources.load([
        'Assets/Arrea/TestTileSet.png',
        'Assets/Buttons/Buttons.png',
    ]);
})();
var TileSets={};
var testCell
function init()
{
    TileSets["test"]=new TileSet('Assets/Arrea/TestTileSet.png',32 ,32);
    testCell=new Sprite(TileSets["test"], new Position(50,50), new Size(64,64))
}

function render()
{
    testCell.draw(ctx);
}

var lastTime;

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //update(dt);

    render();

    lastTime = now;
    requestAnimFrame(main);
};


