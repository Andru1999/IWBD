"use strict"
var MaxDragDist=4;
var LastXY = new PositionOnCanvas(0,0);
var CurentXY = new PositionOnCanvas(0,0);
var IsMooving = false;

function mousedown(event)
{
    if(event.originalEvent.button==0)
    {
        LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
        IsMooving = true;
    }
}

function mouseup(event)
{
    if(event.originalEvent.button==0)
    {
        LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
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
    CurentXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
    if (IsMooving&&
        (CurentXY.x<canvas.width||CurentXY.x>0||
        CurentXY.y<canvas.height||CurentXY.y>0))
    {
        var dis = distance(LastXY, CurentXY);
        if ((dis > MaxDragDist)) {
            Ofset.x += (CurentXY.x - LastXY.x);
            Ofset.y += (CurentXY.y - LastXY.y);
            LastXY.set(CurentXY.x, CurentXY.y);
            IsMooving == true;
            IsNeedToDraw=true;
        }
    }
}
