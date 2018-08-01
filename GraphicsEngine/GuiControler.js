"use strict";

class GuiControler {
    constructor(engine, canvas) {
        this.buttonsControler = new ButtonControler();
        this.canDr_n_Dr = false;
        //Функции Реакций на кнопки
        this.Offset = new PositionOnCanvas(400, 60);
        var MaxDragDist = 15; //Константа
        var canvas = canvas;
        var LastXY = new PositionOnCanvas(0, 0);
        var CurentXY = new PositionOnCanvas(0, 0);
        var IsMooving = false;
        var MosePresed = false;
        this.canDr_n_Dr = false;
        this.canClickOnCells = false;
        this.mousedown = (event) => {
            if (event.originalEvent.button == 0) {
                LastXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);
                MosePresed = true;
            }
        };

        this.mouseup = (event) => {
            if (event.originalEvent.button == 0) {
                LastXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);

                MosePresed = false;
            }
            if (!IsMooving) {
                if (!this.buttonsControler.checkButtons(event.originalEvent.offsetX, event.originalEvent.offsetY) && this.canClickOnCells)
                    engine.doAction(Math.floor((event.originalEvent.offsetX - this.Offset.x) / 32), Math.floor(((event.originalEvent.offsetY - this.Offset.y)) / 32), event.originalEvent.button);
            }
            IsMooving = false;
            MosePresed = false;
        };

        this.mousemove = (event) => {
            function distance(a, b) {
                return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));

            }

            if (MosePresed) {
                CurentXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);
                if (CurentXY.x < canvas.width || CurentXY.x > 0 ||
                    CurentXY.y < canvas.height || CurentXY.y > 0) {
                    var dis = distance(LastXY, CurentXY);
                    if ((dis > MaxDragDist) || IsMooving) {
                        if (this.canDr_n_Dr) {
                            this.Offset.x += (CurentXY.x - LastXY.x);
                            this.Offset.y += (CurentXY.y - LastXY.y);
                            LastXY.set(CurentXY.x, CurentXY.y);
                        }
                        IsMooving = true;
                    }
                }
            }
        }
    }

    swichFase(buttons, canDr_n_Dr, canClickOnCells) {
        this.buttonsControler.switchButtons(buttons);
        this.canDr_n_Dr = canDr_n_Dr;
        this.canClickOnCells = canClickOnCells;
    }
}