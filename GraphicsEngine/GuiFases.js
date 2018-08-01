//"use strict"
function GuiFasesGenerator(sprites, engine) {
    //let setFunction = setFunctions.setUnitFase;
    function startPVEButtonFunction() {
        game.Gui.IsNeedToUpdate = 1;
        game.engine.genWORLD(1,1,0);
        game.engine.genWORLD();
    }

    function startPVPButtonFunction() {
        game.Gui.IsNeedToUpdate =1;
        game.engine.genWORLD(1,1,1);
        game.engine.genWORLD();
    }

    function optionButtonFunction() {
        game.Gui.IsNeedToUpdate = 2;
    }

    function backButtonFunction() {
        game.Gui.IsNeedToUpdate = 1;
    }

    function magicButtonFunction() {
        game.Gui.IsNeedToUpdate = 1;
    }

    function switchAttackMoveButtonFunction() {
        if (this.sprite.index == 1) {
            this.sprite.index = 0;
            engine.setAction("move");
        } else {
            this.sprite.index = 1;
            engine.setAction("attack");
        }
    }

    function nextButtonFunction() {
        engine.nextRound();
    }

    return [
        {//StartGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[0], new PositionOnCanvas(500, 400), "mainCanvas", startPVEButtonFunction),
                        new Button(sprites.buttons[6], new PositionOnCanvas(500, 500), "mainCanvas", startPVPButtonFunction),
                    ],///Тут могут быть другие обьекты
                },
            canDrawMap: false,
            canDrag_n_Drop: false,
            canClickOnCells: false

        },
        {//mainGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[4], new PositionOnCanvas(0, 0), "mainCanvas", optionButtonFunction),
                        new Button(sprites.buttons[3], new PositionOnCanvas(0, 700), "mainCanvas", switchAttackMoveButtonFunction),
                        new Button(sprites.buttons[5], new PositionOnCanvas(900, 700), "mainCanvas", nextButtonFunction),
                        new Button(sprites.buttons[7], new PositionOnCanvas(500, 700), "mainCanvas", magicButtonFunction),
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: true,
            canClickOnCells: true

        },
        {//optionGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[2], new PositionOnCanvas(500, 500), "mainCanvas", backButtonFunction),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", () => {
                        })
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false
        }
    ];
}
