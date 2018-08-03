//"use strict"
function GuiFasesGenerator(gui,sprites, engine) {
    //let setFunction = setFunctions.setUnitFase;
    function startPVEButtonFunction() {
        gui.IsNeedToUpdate = 1;
        engine.genWORLD(0);
    }

    function resetButtonFunction() {
        gui.IsNeedToUpdate = 1;
        let buff=engine._world._battleType;
        engine.exitWorld();
        engine.genWORLD(buff);
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

    function exitButtonFunction() {
        gui.IsNeedToUpdate = 0;
        gui.controler.Offset = new PositionOnCanvas(400, 60);
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
        let s=engine.nextRound()
        if (s=="you've lost")
        {
            gui.IsNeedToUpdate = 3;
            return;
        }
        if (s=="you've win")
        {
            gui.IsNeedToUpdate = 4;
            return;
        }
        if (s=="first team win")
        {
            gui.IsNeedToUpdate = 5;
            return;
        }
        if (s=="second team win")
        {
            gui.IsNeedToUpdate = 6;
            return;
        }
    }

    function nextRoundButtonFunction() {
        gui.IsNeedToUpdate = 1;
        engine.nextLvl();
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
            canUpdateAnimation:false,
            background:sprites["background"][0],

        },
        {//mainGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[4], new PositionOnCanvas(10, 10), "mainCanvas", optionButtonFunction, 0),
                        new Button(sprites.buttons[7], new PositionOnCanvas(10, 100), "mainCanvas", resetButtonFunction, 0),
                        new Button(sprites.buttons[3], new PositionOnCanvas(50, 700), "mainCanvas", switchAttackMoveButtonFunction, 0),
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
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", exitButtonFunction,0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        },
        {//looseGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[13], new PositionOnCanvas(500, 300), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[12], new PositionOnCanvas(500, 500), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", exitButtonFunction,0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        },
        {//winGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[11], new PositionOnCanvas(500, 300), "mainCanvas", nextRoundButtonFunction,0),
                        new Button(sprites.buttons[10], new PositionOnCanvas(500, 500), "mainCanvas", nextRoundButtonFunction,0),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", exitButtonFunction,0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        },
        {//fistTeamWinGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[8], new PositionOnCanvas(500, 300), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[12], new PositionOnCanvas(500, 500), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", exitButtonFunction,0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        },
        {//secondTeamWinGameFase
            GuiElements:
                {
                    buttons: [
                        new Button(sprites.buttons[9], new PositionOnCanvas(500, 300), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[12], new PositionOnCanvas(500, 500), "mainCanvas", resetButtonFunction,0),
                        new Button(sprites.buttons[1], new PositionOnCanvas(500, 650), "mainCanvas", exitButtonFunction,0)
                    ],
                },

            canDrawMap: true,
            canDrag_n_Drop: false,
            canClickOnCells: false,
            canUpdateAnimation:false
        }
    ];
}
