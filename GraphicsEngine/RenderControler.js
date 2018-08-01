"use strict";

class RenderControler {
    constructor(sprites, canvases, engine) {
        this.sprites = sprites;
        this.canvases = canvases;
        this.engine = engine;
        this.worldSize = this.engine.getWorldSize();
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvases, "mainCanvas", x, y);
        //Отрисовка справйта
    }

    renderMap(canDo, offset) {
        if (canDo) {
            var leftHightCell = new PositionOnCanvas(Math.floor((-offset.x) / BaseCellWidth) - 1, Math.floor(((-offset.y)) / BaseCellHeight) - 1);
            var rightBottomCell = new PositionOnCanvas(Math.floor((-offset.x + this.canvases["mainCanvas"].width) / BaseCellWidth) + 1, Math.floor(((-offset.y + this.canvases["mainCanvas"].height)) / BaseCellHeight) + 1);
            leftHightCell.x = Math.max(0, leftHightCell.x);
            leftHightCell.y = Math.max(0, leftHightCell.y);
            rightBottomCell.x = Math.min(rightBottomCell.x, this.worldSize.width);
            rightBottomCell.y = Math.min(rightBottomCell.y, this.worldSize.height);
            for (let x = leftHightCell.x; x < rightBottomCell.x; x++) {
                for (let y = leftHightCell.y; y < rightBottomCell.y; y++) {
                    let count = 0;
                    for (let z = 0; z < this.worldSize.depth; z++) {
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