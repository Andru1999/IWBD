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
        game.init(SpriteArr, { maincanvas:$("#main_game_canvas")[0] });
        requestAnimFrame(()=>
        {
            loop(Date.now());
        });
    });
};

class Game {
    init(SpriteArr,canvases)
    {
        canvases.maincanvas.width=1400;
        canvases.maincanvas.height=800;
        this.engine = new SpaceWorld();
        this.Gui= new GUI(SpriteArr,{},{},canvases);
        $(canvases.maincanvas).mousedown(game.Gui.controler.mousedown);
        $("body").mouseup(game.Gui.controler.mouseup);
        $("body").mousemove(game.Gui.controler.mousemove);
        //  $("#action_button").click(game.renderManager.DisplControler.actionButtonClick);
    }
    render()
    {
        this.Gui.updateGui();
        this.Gui.render();
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
    let curentTime=Date.now();
    let dt = (curentTime - lastTime)/1000;
    game.render();
    game.update(dt);
    requestAnimFrame(()=>
    {
        loop(curentTime);
    });
}


