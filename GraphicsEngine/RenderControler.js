"use strict"
class RenderControler {
    constructor(arr, main_canvas,info_canvas, getFunc)
    {
        this.sprites = arr;
        this.maincanvas = main_canvas;
        this.maincanvasCtx = main_canvas.getContext("2d");
        this.infocanvas = main_canvas;
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.maincanvasCtx, x, y);
        //Отрисовка справйта
    }
    renderMap(canDo)
    {
        if (canDo)
        {
            //todo
        }

    }
    renderBackground()
    {
        this.maincanvasCtx.fillStyle = "black";
        this.maincanvasCtx.fillRect(0,0,this.maincanvas.width,this.maincanvas.height);
    }
    renderGui()
    {
        for(let button of this.buttons)
        {
            button.draw(this.maincanvasCtx);
        }
    }
    swichFase(buttons)
    {
        this.buttons=buttons;
    }
}