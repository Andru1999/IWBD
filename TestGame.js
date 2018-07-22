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
    init(SpriteArr,canvas)
    {
        canvas.width=1400;
        canvas.height=800;

        this.engine = new SpaceWorld();
        this.renderManager=new RenderManager(SpriteArr,canvas,this.engine,this.engine.getWorldSize());
    }


    free() {

    }
}

function loop()
{
    game.renderManager.renderAll();
    requestAnimFrame(loop);
}


