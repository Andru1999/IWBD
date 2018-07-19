"use strict"
class MousePositionOnCanvas
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    set (x, y)
    {
        this.x = x;
        this.y = y;
    }
}
Ofset=new MousePositionOnCanvas(0,0);

var LastXY = new MousePositionOnCanvas(0,0);
var CurentXY = new MousePositionOnCanvas(0,0);
var IsMooving = false;
var MaxDragDist=10;//Дистанция в пикселях при которой начинается drag&drop
var MosePresed=false;

function mousedown(event)
{
    if(event.originalEvent.button==0)
    {
        LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
        MosePresed=true;
    }

}

function mouseup(event)
{
    if(event.originalEvent.button==0)
    {
        LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
        MosePresed = false;
    }
    if (IsMooving) {
        IsMooving = false;
        return;
    }
}
function distance(a,b)
{
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));

}

function mousemove(event)
{
    if (MosePresed) {
        CurentXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
        if (CurentXY.x < canvas.width || CurentXY.x > 0 ||
            CurentXY.y < canvas.height || CurentXY.y > 0) {
            var dis = distance(LastXY, CurentXY);
            if ((dis > MaxDragDist) || IsMooving) {
                Ofset.x += (CurentXY.x - LastXY.x);
                Ofset.y += (CurentXY.y - LastXY.y);
                LastXY.set(CurentXY.x, CurentXY.y);
                IsMooving = true;
                IsNeedToDraw = true;
            }
        }
    }
}
