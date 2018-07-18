function Size(width,height)
{
    this.width=width;
    this.height=height;
}

function Position(x,y)
{
    this.x=x;
    this.y=y;
}

function getframe(url, dx, dy)
{
    var img = resources.getTexture(url);
    var frame = new Array(Math.floor(img.width / dx) * Math.floor(img.height / dy));

    for (var i = 0; i < Math.floor(img.width / dx); i++) {
        for (var j = 0; j < Math.floor(img.height / dy); j++) {
            frame[i *  Math.floor(img.height / dy) + j] =
                {
                    "x": i * dx,
                    "y": j * dy,
                    "w": dx,
                    "h": dy
                }
        }
    }
    return frame;
}

function TileSet(url, dx, dy)
{
    this.frame=getframe(url, dx, dy);
    this.url = url;
}

function Sprite(tile_set, position, size)
{
    this.tiles=tile_set;
    this.size=size;
    this.draw=(ctx)=>
    {
        let img = resources.getTexture(this.tiles.url);
        let img_x = this.tiles.frame[this.index].x;
        let img_y = this.tiles.frame[this.index].y;
        let img_dx = this.tiles.frame[this.index].w;
        let img_dy = this.tiles.frame[this.index].h;
        let x = this.position.x;
        let y = this.position.y;
        let width = this.size.width;
        let height = this.size.height;
        ctx.drawImage(img,img_x,img_y,img_dx,img_dy,x,y,width,height);
        this.index++;
        if (this.index>190)
        {
            this.index = 0;
        }
    };
    this.position=position;
    this.index = 30;
}