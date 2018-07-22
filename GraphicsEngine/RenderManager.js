"use strict"
class RenderManager {
    constructor(arr, canvas, engine)
    {
        this.sprites = arr;
        this.canvas = canvas;
        this.engine = engine;
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvas.getContext("2d"), x, y);
        //Отрисовка справйта
    }

    renderAll() {
        let ctx=this.canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        for (let z=0;z<10;z++) {
            for (let x = 0; x < 1000; x++) {
                for (let y = 0; y < 1000; y++) {
                    let cell = this.engine.getCellInfo(x,y,z);
                    if (cell!="empty")
                    {
                        this.renderSprite(cell.type,cell.variant,x*BaseCellWidth,y*BaseCellHeight);
                    }
                }
            }
        }
        //Отрисовка справйта
    }
}