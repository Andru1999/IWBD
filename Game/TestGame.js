"use strict";

var game;

var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
    };


window.onload = () => {
    function eval_after_load_resurses(SpriteArr){
        game = new Game();
        let gui = new GUI(game, SpriteArr);
        requestAnimationFrame(()=> {
            loop(gui, Date.now())
        });
    }
    loadBaseResurses(eval_after_load_resurses);
};

class Game {
    constructor(){
        this.engine = new SpaceWorld();
    }
}

function loop(gui,lastTime)
{
    let currentTime = Date.now();
    gui.updateGui((currentTime-lastTime)/1000);
    gui.render();
    requestAnimationFrame(()=>
    {
        loop(gui,currentTime)
    });
}


