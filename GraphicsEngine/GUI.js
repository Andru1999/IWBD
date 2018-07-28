class GUI
{
    constructor(spriteArr,getFunctions,setFunctions,canvases)
    {

        this.curentFase = 0;
        this.IsNeedToUpdate = 0; //Если = -1 не нужен update, иначе перейти на фазу с соответствующим индексом
        let Offset = new PositionOnCanvas(0,0);//todo
        this.fases = GuiFasesGenerator(Offset,spriteArr,setFunctions);
        this.controler = new GuiControler(setFunctions,canvases.maincanvas, Offset);
        this.renderControler = new RenderControler(spriteArr,canvases.maincanvas,{}/*canvases.infocanvas*/,getFunctions,Offset);

    }
    render()
    {
        this.renderControler.renderBackground();
        this.renderControler.renderMap(this.fases[this.curentFase].canDrawMap);
        this.renderControler.renderGui();
    }
    switchFase(index)
    {
        this.curentFase=index;
        this.renderControler.swichFase(this.fases[index].buttons);
        this.controler.swichFase(this.fases[index].buttons,this.fases[index].canDrag_n_Drop,this.fases[index].canClickOnCells);
        this.IsNeedToUpdate=-1;
    }
    updateGui()
    {
        if(this.IsNeedToUpdate!=-1)
        {
            this.switchFase(this.IsNeedToUpdate);
        }
    }
}