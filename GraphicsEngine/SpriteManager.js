"use strict"

class Size
{
    constructor(width,height)
    {
        this.width=width;
        this.height=height;
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


