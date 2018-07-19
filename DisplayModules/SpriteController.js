"use strict"
var Ofset=new PositionOnCanvas(0,0);

function Size(width,height)
{
    this.width=width;
    this.height=height;
}

function PositionOnCanvas(x,y)
{
    this.x=x;
    this.y=y;
    this.set=function (x,y)
    {
        this.x=x;
        this.y=y;
    }
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

function Texture(url, dx, dy)
{
    this.frame=getframe(url, dx, dy);
    this.url = url;
}

function BaseSprite(texture, size, index)
{
    this.texture=texture;
    this.size=size;
    this.index=index;
}

function Sprite(base_sprite, position)
{
    this.texture=base_sprite.texture;
    this.size=base_sprite.size;
    this.draw=(ctx,vis )=>
    {
        if (vis==1|| vis==1) {
            let img = resources.getTexture(this.texture.url);
            let img_x = this.texture.frame[this.index].x;
            let img_y = this.texture.frame[this.index].y;
            let img_dx = this.texture.frame[this.index].w;
            let img_dy = this.texture.frame[this.index].h;
            let x = this.position.x + Ofset.x;
            let y = this.position.y + Ofset.y;
            let width = this.size.width;
            let height = this.size.height;
            if (x > -32 && x < canvas.width + 32 && y - 32 < canvas.height && y > -32)
                ctx.drawImage(img, img_x, img_y, img_dx, img_dy, x, y, width, height);
            if(vis=1)
            return;
            ctx.drawImage(, img_x, img_y, img_dx, img_dy, x, y, width, height);
        }

    };
    this.position=position;
    this.index = base_sprite.index;
}