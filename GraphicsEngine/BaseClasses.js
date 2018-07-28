"use strict"

class Size
{
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
    }
}

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

class Texture {
    constructor(img, dx, dy)
    {
        function getframe(Img, dx, dy)
        {
            var img = Img;
            var frame = new Array(Math.floor(img.width / dx) * Math.floor(img.height / dy));

            for (var i = 0; i < Math.floor(img.width / dx); i++){
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
        this.frame = getframe(img, dx, dy);
        this.img = img;
    }
}




class BaseSprite
{
    constructor(texture, size, index)
    {
    this.texture = texture;
    this.size = size;
    this.index = index;
    }
    draw(ctx, x, y)
    {
        let img = this.texture.img;
        let img_x = this.texture.frame[this.index].x;
        let img_y = this.texture.frame[this.index].y;
        let img_dx = this.texture.frame[this.index].w;
        let img_dy = this.texture.frame[this.index].h;
        let width = this.size.width;
        let height = this.size.height;
        ctx.drawImage(img, img_x, img_y, img_dx, img_dy, x, y, width, height);
    }
}

class Button {
    constructor(sprite,position,size,clickFunction)
    {
        this.sprite=sprite;
        this.position=position;
        this.size=size;
        this.click=clickFunction;

    }
    detect(x,y)
    {
        function inRect(x,y,x1,y1,width,height) {
            return ((x<x1+width)&&(x>x1)&&(y<y1+height)&&(y>y1))

        }
        if (inRect(x,y,this.position.x,this.position.y,this.size.width,this.size.height))
        {
            this.click();
            return true;
        }
        return false;
    }
    draw(ctx)
    {
        this.sprite.draw(ctx, this.position.x,this.position.y);
    }
}



