"use strict";

var game;

window.onload = () => {
    function eval_after_load_resurses(SpriteArr){
        game = new Game();
        let gui = new GUI(game, SpriteArr);

        var body = $("body");
        body.mouseup(gui.controler.mouseup);
        body.mousemove(gui.controler.mousemove);

        new AnimationLoop( (dt) => {
            gui.render();
            gui.updateGui();
        }).start();

    }
    LoadBaseResurses(eval_after_load_resurses);
};

class Game {
    constructor(){
        this.engine = new SpaceWorld();
    }
}


