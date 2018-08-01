"use strict";

class RenderControler {
    constructor(sprites, canvases, engine,animArr) {
        this.sprites = sprites;
        this.canvases = canvases;
        this.engine = engine;
        this.animations=animArr;
    }

    update(dt,canAnim)
    {
        if (canAnim)
        {
            for (let i=0; i<this.animations.length;i++)
            {
                let anim = this.animations[i];
                if(anim.update==undefined)
                {
                    let pos=anim;
                    this.animations[i]=new BaseAnimation(this.sprites["dmg"],pos,5,2);
                }
                let res = anim.update(dt);
                if (res="end")
                {
                    this.animations.splice(i,1);
                }
            }
        }
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvases, "mainCanvas", x, y);
        //Отрисовка справйта
    }

    renderMap(canDo, offset) {
        var worldSize = this.engine.getWorldSize();
        if (canDo&&worldSize) {
            var leftHightCell = new PositionOnCanvas(Math.floor((-offset.x) / BaseCellWidth) - 1, Math.floor(((-offset.y)) / BaseCellHeight) - 1);
            var rightBottomCell = new PositionOnCanvas(Math.floor((-offset.x + this.canvases["mainCanvas"].width) / BaseCellWidth) + 1, Math.floor(((-offset.y + this.canvases["mainCanvas"].height)) / BaseCellHeight) + 1);
            leftHightCell.x = Math.max(0, leftHightCell.x);
            leftHightCell.y = Math.max(0, leftHightCell.y);
            rightBottomCell.x = Math.min(rightBottomCell.x, worldSize.width);
            rightBottomCell.y = Math.min(rightBottomCell.y, worldSize.height);
            for (let x = leftHightCell.x; x < rightBottomCell.x; x++) {
                for (let y = leftHightCell.y; y < rightBottomCell.y; y++) {
                    let count = 0;
                    for (let z = 0; z < worldSize.depth; z++) {
                        let cellInfo = this.engine.getCellInfo(x, y, z);
                        if (cellInfo.visibility == 0 || cellInfo.type == "empty") {
                            continue;
                        } else {

                            if (cellInfo.visibility == -1) {
                                count++;
                                if(cellInfo.type!="hero"&&cellInfo.type!="mob")
                                    this.renderSprite(cellInfo.type, cellInfo.variant, x * BaseCellWidth + offset.x, y * BaseCellHeight + offset.y);
                            }else
                            {
                                this.renderSprite(cellInfo.type, cellInfo.variant, x * BaseCellWidth + offset.x, y * BaseCellHeight + offset.y);
                            }
                        }
                    }
                    if (count!=0)
                    {
                        this.renderSprite("smoke", 0, x * BaseCellWidth + offset.x, y * BaseCellHeight + offset.y);
                    }
                }
            }
        }


    }

    renderBackground() {
        let canvas = this.canvases["mainCanvas"];
        let ctx = (canvas.getContext("2d"));
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas = this.canvases["infoCanvas"];
        ctx = (canvas.getContext("2d"));
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    renderAnimation(canDo,offset)
    {
        if (canDo)
        {
            for (let anim of this.animations)
            {
                anim.draw(this.canvases, "mainCanvas",anim.position.x+BaseCellWidth+offset.x,anim.position.y*BaseCellHeight+offset.y);
            }
        }
    }

    renderGui(GuiElements) {
        for (let Element in GuiElements) {
            if (typeof(GuiElements[Element]["draw"]) != "undefined") {
                GuiElements[Element].draw(this.canvases);
            }
            else {
                this.renderGui(GuiElements[Element]);
            }
        }
    }
}