//"use strict"
function GuiFasesGenerator(Offset,sprites,setFunctions)
{
    //let setFunction = setFunctions.setUnitFase;
    function startButtonFunction()
    {
        game.Gui.IsNeedToUpdate=1;
    }
    function optionButtonFunction()
    {
        game.Gui.IsNeedToUpdate=2;
    }
    function backButtonFunction()
    {
        game.Gui.IsNeedToUpdate=1;
    }

    function switchAttackMoveButtonFunction()
    {
        if (this.sprite.index==0){
            this.sprite.index=1;
            setFunction("move");
        }else
        {
            this.sprite.index=0;
            setFunction("attack");
        }

    }

    return[
        {//StartGameFase
            buttons:[
                new Button(sprites.buttons[0],new PositionOnCanvas(500,500),sprites.buttons[0].size,startButtonFunction)
            ],
            canDrawMap:false,
            canDrag_n_Drop:false,
            canClickOnCells:false

        },
        {//mainGameFase
            buttons:[
                new Button(sprites.buttons[4],new PositionOnCanvas(0,0),sprites.buttons[4].size,optionButtonFunction),
                new Button(sprites.buttons[3],new PositionOnCanvas(0,800),sprites.buttons[3].size,switchAttackMoveButtonFunction)
            ],
            canDrawMap:true,
            canDrag_n_Drop:true,
            canClickOnCells:true

        },
        {//optionGameFase
            buttons:[
                new Button(sprites.buttons[2],new PositionOnCanvas(500,500),sprites.buttons[2].size,backButtonFunction),
                new Button(sprites.buttons[1],new PositionOnCanvas(500,650),sprites.buttons[1].size,()=>{})
            ],
            canDrawMap:true,
            canDrag_n_Drop:false,
            canClickOnCells:false
        }
    ];
}
