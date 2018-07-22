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
        requestAnimFrame(()=>
        {
            loop(Date.now());
        });
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
        $("#action_button").click(game.renderManager.DisplControler.actionButtonClick);
    }
    render()
    {
        this.renderManager.renderAll();
        //todo this.renderManager.renderGui();
    }
    update(dt)
    {
        //todo this.core.update(dt);
    }

    free() {

    }
}

function loop(lastTime)
{
    var curentTime=Date.now();
    let dt = (curentTime - lastTime)/1000;
    game.render();
    game.update(dt);
    requestAnimFrame(()=>
    {
        loop(curentTime);
    });
}


