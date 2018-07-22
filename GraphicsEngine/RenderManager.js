"use strict"
class RenderManager {
    constructor(arr, canvas, engine, worldInfo)
    {
        this.sprites = arr;
        this.canvas = canvas;
        this.engine = engine;
        this.worldInfo=worldInfo;
        this.DisplControler= new DisplayControler(engine,canvas);
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvas.getContext("2d"), x, y);
        //Отрисовка справйта
    }

    renderAll() {
        let ctx=this.canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        for (let z=0;z<this.worldInfo.depth;z++) {
            for (let x = 0; x < this.worldInfo.width; x++) {
                for (let y = 0; y < this.worldInfo.height; y++) {
                    let cell = this.engine.getCellInfo(x,y,z);
                    if (cell!="empty")
                    {
                        this.renderSprite(cell.type,cell.variant,x*BaseCellWidth+this.DisplControler.Offset.x,y*BaseCellHeight+this.DisplControler.Offset.y);
                    }
                }
            }
        }
        //Отрисовка справйта
    }
}