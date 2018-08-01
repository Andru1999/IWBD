"use strict";

var requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

var game;

window.onload = () => {
    LoadBaseResurses((SpriteArr) => {
        game = new Game();
        let canvases = {
            mainCanvas: $("#main_game_canvas")[0],
            infoCanvas: $("#info_game_canvas")[0] //todo
        };
        canvases.mainCanvas.width = 1400;
        canvases.mainCanvas.height = 800;
        canvases.infoCanvas.width = 400;
        canvases.infoCanvas.height = 600;
        game.init(SpriteArr, canvases);
        requestAnimFrame(() => {
            loop(Date.now());
        });
    });
};

class Game {
    init(SpriteArr, canvases) {
        let engine = new SpaceWorld(50,50,3);

        this.engine = engine;
        this.Gui = new GUI(SpriteArr, engine, canvases);
        $(canvases.mainCanvas).mousedown(game.Gui.controler.mousedown);
        $("body").mouseup(game.Gui.controler.mouseup);
        $("body").mousemove(game.Gui.controler.mousemove);
        //  $("#action_button").click(game.renderManager.DisplControler.actionButtonClick);
    }

    render() {
        this.Gui.updateGui();
        this.Gui.render();
    }

    update(dt) {
        //todo this.core.update(dt);
    }

    free() {

    }
}

function loop(lastTime) {
    let curentTime = Date.now();
    let dt = (curentTime - lastTime) / 1000;
    game.render();
    game.update(dt);
    requestAnimFrame(() => {
        loop(curentTime);
    });
}


