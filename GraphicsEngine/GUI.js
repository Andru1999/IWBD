class GUI extends UI {
    constructor(game, spriteArr) {
        super(game);
        this.canvases = {
            mainCanvas: $("#main_game_canvas")[0],
            infoCanvas: $("#info_game_canvas")[0] //todo
        };

        this.canvases.mainCanvas.width = 1400;
        this.canvases.mainCanvas.height = 800;
        this.canvases.infoCanvas.width = 400;
        this.canvases.infoCanvas.height = 800;
        this.curentFase = 0;
        this.IsNeedToUpdate = 0; //Если = -1 не нужен update, иначе перейти на фазу с соответствующим индексом
        this.fases = GuiFasesGenerator(this, spriteArr, this.game.engine);
        this.renderControler = new RenderControler(spriteArr, this.canvases, this.game.engine);
        this.controler = new GuiControler(this.game.engine, this.canvases.mainCanvas,this.renderControler.animationConnroler);


        $(this.canvases.mainCanvas).mousedown(this.controler.mousedown);
        $(this.canvases.mainCanvas).mouseup(this.controler.mouseup);
        $(this.canvases.mainCanvas).mousemove(this.controler.mousemove);
    }

    render() {
        this.renderControler.renderBackground(this.fases[this.curentFase].background);
        this.renderControler.renderMap(this.fases[this.curentFase].canDrawMap, this.controler.Offset);
        this.renderControler.renderAnimation(this.fases[this.curentFase].canDrawMap,this.controler.Offset)
        this.renderControler.renderGui(this.fases[this.curentFase].GuiElements);
    }

    switchFase(index) {
        this.curentFase = index;
        this.controler.swichFase(this.fases[index].GuiElements.buttons, this.fases[index].canDrag_n_Drop, this.fases[index].canClickOnCells);
        this.IsNeedToUpdate = -1;
    }

    updateGui(dt) {
        if (this.IsNeedToUpdate != -1) {
            this.switchFase(this.IsNeedToUpdate);
        }
        this.renderControler.update(dt,this.fases[this.curentFase].canUpdateAnimation);

    }

    updateElements(GuiElements) {
        for (let Element in GuiElements) {
            if (typeof(GuiElements[Element]["update"]) != "undefined") {
                GuiElements[Element].update();
            }
            else {
                this.updateElements(GuiElements[Element]);
            }
        }
    }
}