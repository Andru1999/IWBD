"use strict"

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
var testCells=new Array(16);
var World;
function init()
{
    TileSets["test"]=new TileSet('Assets/Arrea/TestTileSet.png',32 ,32);
    World=new Map(20,20,1);
    World.generateMap();
}

function render()
{
    for (var i=0;i<20;i++)
    {
        for (var j=0;j<20;j++)
        {
            World._state[i][j][0]._texture.draw(ctx);
        }
    }
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


