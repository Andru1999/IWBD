//"use strict"
function GuiFasesGenerator(gui,sprites, engine) {
    //let setFunction = setFunctions.setUnitFase;
    function startPVEButtonFunction() {
        gui.IsNeedToUpdate = 1;
        engine.genWORLD(0);
    }

    function startPVPButtonFunction() {
        gui.IsNeedToUpdate =1;
        engine.genWORLD(1);
    }

    function optionButtonFunction() {
        gui.IsNeedToUpdate = 2;
    }

    function backButtonFunction() {
        gui.IsNeedToUpdate = 1;
    }

    function magicButtonFunction() {
        //todo
        engine.useMagic(engine);
    }

    function switchAttackMoveButtonFunction() {
        if (this.index == 1) {
            this.index=0;
            engine.setAction("move");
        } else {
            this.index=1;
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
                        new Button(sprites.buttons[0], new PositionOnCanvas(500, 400), "mainCanvas", startPVEButtonFunction,0),
                        new Button(sprites.buttons[0], new PositionOnCanvas(500, 500), "mainCanvas", startPVPButtonFunction,1),
                    ],///Тут могут быть другие обьекты
                },
            canDrawMap: false,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false

        },
        {//mainGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[4], new PositionOnCanvas(10, 10), "mainCanvas", optionButtonFunction, 0),
                        new Button(sprites.buttons[3], new PositionOnCanvas(20, 700), "mainCanvas", switchAttackMoveButtonFunction, 0),
                        new Button(sprites.buttons[5], new PositionOnCanvas(900, 700), "mainCanvas", nextButtonFunction, 0),
                        new Button(sprites.buttons[6], new PositionOnCanvas(500, 700), "mainCanvas", magicButtonFunction, 0),
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: true,
            canClickOnCells: true,
            canUpdateAnimation:true

        },
        {//optionGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[2], new PositionOnCanvas(500, 500), "mainCanvas", backButtonFunction,0),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", () => {},0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        }
    ];
}
