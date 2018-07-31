class GUI
{
    constructor(spriteArr,engine,canvases)
    {

        this.curentFase = 0;
        this.IsNeedToUpdate = 0; //Если = -1 не нужен update, иначе перейти на фазу с соответствующим индексом
        this.fases = GuiFasesGenerator(spriteArr,engine);
        this.controler = new GuiControler(engine,canvases.mainCanvas);
        this.renderControler = new RenderControler(spriteArr,canvases,engine);

    }
    render()
    {
        this.renderControler.renderBackground();
        this.renderControler.renderMap(this.fases[this.curentFase].canDrawMap,);
        this.renderControler.renderGui(this.fases[this.curentFase].GuiElements);
    }
    switchFase(index)
    {
        this.curentFase=index;
        this.controler.swichFase(this.fases[index].GuiElements.buttons,this.fases[index].canDrag_n_Drop,this.fases[index].canClickOnCells);
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