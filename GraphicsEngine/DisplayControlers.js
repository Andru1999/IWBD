"use strict"
class DisplayControler
{
    constructor(engine,_canvas)
    {
        class PositionOnCanvas
        {
            constructor(x,y)
            {
                this.x = x;
                this.y = y;
            }
            set(x,y)
            {
                this.x = x;
                this.y = y;
            }
        }
        this.Offset= new PositionOnCanvas(0,0);
        this.engine=engine;
        var MaxDragDist=4;
        var canvas = _canvas;
        var LastXY = new PositionOnCanvas(0,0);
        var CurentXY = new PositionOnCanvas(0,0);
        var IsMooving = false;
        var MosePresed = false;
        this.mousedown = (event)=>
        {
            if(event.originalEvent.button==0)
            {
                LastXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);
                MosePresed=true;
            }
        }
        this.mouseup = (event)=>
        {
            if(event.originalEvent.button==0)
            {
                LastXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);
                MosePresed = false;
            }
            if (IsMooving) {
                IsMooving = false;
                return;
            }else
            {
                engine.doAction(Math.floor((event.originalEvent.offsetX - this.Offset.x)/32),Math.floor(((event.originalEvent.offsetY - this.Offset.y))/32),event.originalEvent.button);
            }
        }
        this.mousemove = (event)=>
        {
            function distance(a,b)
            {
                return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));

            }
            if (MosePresed) {
                CurentXY.set(event.originalEvent.offsetX, event.originalEvent.offsetY);
                if (CurentXY.x < canvas.width || CurentXY.x > 0 ||
                    CurentXY.y < canvas.height || CurentXY.y > 0) {
                    var dis = distance(LastXY, CurentXY);
                    if ((dis > MaxDragDist) || IsMooving) {
                        this.Offset.x += (CurentXY.x - LastXY.x);
                        this.Offset.y += (CurentXY.y - LastXY.y);
                        LastXY.set(CurentXY.x, CurentXY.y);
                        IsMooving = true;
                        IsNeedToDraw = true;
                    }
                }
            }
        }
    }
}