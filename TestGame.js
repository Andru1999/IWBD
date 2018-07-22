"use strict"
var requestAnimFrame =
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame;
var game;
window.onload=()=>
{
    LoadBaseResurses((SpriteArr)=>
    {
        game=new Game();
        game.init(SpriteArr, $("#main_game_canvas")[0]);
        requestAnimFrame(loop);
    });
};

class Game {
    init(SpriteArr,maincanvas)
    {
        maincanvas.width=1400;
        maincanvas.height=800;
        this.engine = new SpaceWorld();
        this.renderManager=new RenderManager(SpriteArr,maincanvas,this.engine,this.engine.getWorldSize());
        $(maincanvas).mousedown(game.renderManager.DisplControler.mousedown);
        $("body").mouseup(game.renderManager.DisplControler.mouseup);
        $("body").mousemove(game.renderManager.DisplControler.mousemove);
    }


    free() {

    }
}

function loop()
{
    game.renderManager.renderAll();
    requestAnimFrame(loop);
}


