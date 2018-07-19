"use strict"
alert("DisplayControlers")

var LastXY = new PositionOnCanvas(0,0);
var CurentXY = new PositionOnCanvas(0,0);
var IsMooving = false;

function mousedown(event)
{
    LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
    IsMooving=true;
}

function mouseup(event)
{
    LastXY.set(event.originalEvent.clientX, event.originalEvent.clientY);

    IsMooving=false;
}
function distance(a,b)
{
    return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));

}
function mousemove(event)
{
    CurentXY.set(event.originalEvent.clientX, event.originalEvent.clientY);
    if (IsMooving)
    {
        var dis = distance(LastXY, CurentXY);
        if ((dis > 5)) {
            Ofset.x += (CurentXY.x - LastXY.x);
            Ofset.y += (CurentXY.y - LastXY.y);
            LastXY.set(CurentXY.x, CurentXY.y);
            IsMooving == true;
        }
    }
    if (CurentXY.x>canvas.width||CurentXY.x<0||
        CurentXY.y>canvas.height||CurentXY.y<0)
    {
        IsMooving=false;
    }
}
