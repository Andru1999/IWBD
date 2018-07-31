"use strict"
class RenderControler {
    constructor(sprites,canvases,engine)
    {
        this.sprites = sprites;
        this.canvases=canvases;
        this.engine = engine;
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvases,"mainCanvas", x, y);
        //Отрисовка справйта
    }
    renderMap(canDo)
    {
        if (canDo)
        {
           //for (let i = Number.max(0,);i</*todo */,i++)

            //game.engine.getCellInfo()
        }
    }
    renderBackground()
    {
        let canvas=this.canvases["mainCanvas"];
        let ctx=(canvas.getContext("2d"));
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        canvas=this.canvases["infoCanvas"];
        ctx=(canvas.getContext("2d"));
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    renderGui(GuiElements)
    {
        for(let Element in GuiElements)
        {
            if (typeof(GuiElements[Element]["draw"])!="undefined")
            {
                GuiElements[Element].draw(this.canvases);
            }
            else
            {
                this.renderGui(GuiElements[Element]);
            }
        }
    }
}