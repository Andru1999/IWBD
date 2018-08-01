"use strict";

class Size {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class PositionOnCanvas {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Texture {
    constructor(img, dx, dy) {
        function getframe(Img, dx, dy) {
            var img = Img;
            var frame = new Array(Math.floor(img.width / dx) * Math.floor(img.height / dy));

            for (var i = 0; i < Math.floor(img.width / dx); i++) {
                for (var j = 0; j < Math.floor(img.height / dy); j++) {
                    frame[i * Math.floor(img.height / dy) + j] =
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

class BaseSprite {
    constructor(texture,size,frameArray) {
        this.texture = texture;
        this.size = size;
        this.frames=frameArray;
    }

    draw(canvases, chosenCanvas, x, y, index) {
        if (index==undefined)
        {
            index=0;
        }
        index%=this.frames.length;
        let ctx = canvases[chosenCanvas].getContext("2d");
        let img = this.texture.img;
        let img_x = this.texture.frame[this.frames[index]].x;
        let img_y = this.texture.frame[this.frames[index]].y;
        let img_dx = this.texture.frame[this.frames[index]].w;
        let img_dy = this.texture.frame[this.frames[index]].h;
        let width = this.size.width;
        let height = this.size.height;
        ctx.drawImage(img, img_x, img_y, img_dx, img_dy, x, y, width, height);
    }
}
class BaseAnimation {
    constructor(baseSprite,position,speed,loop)
    {
        this.sprite=baseSprite;
        this.speed=speed;
        this.dt=speed;
        this.numberOfLoop=loop*this.sprite.frame.length;
        this.position = position;
    }

    update(dt)
    {
        this.dt-=dt;
        if(this.dt<0)
        {
            this.dt=this.speed;
            this.numberOfLoop--;
        }
        if (this.numberOfLoop==-1)
        {
            return "end";
        }else
        {
            return "procesed";
        }
    }

    draw(canvases,nameOfCanvas,x,y)
    {
        this.sprite.draw(canvases,nameOfCanvas,x,y,this.numberOfLoop%this.sprite.frame.length);
    }
}

class Button {
    constructor(sprite, position, canvas, clickFunction, frameIndex) {
        this.sprite = sprite;
        this.position = position;
        this.size = sprite.size;
        this.click = clickFunction;
        this.canvas = canvas;
        this.index = frameIndex;
    }

    detect(x, y) {
        function inRect(x, y, x1, y1, width, height) {
            return ((x < x1 + width) && (x > x1) && (y < y1 + height) && (y > y1))

        }
        if (inRect(x, y, this.position.x, this.position.y, this.size.width, this.size.height)) {
            this.click();
            return true;
        }
        return false;
    }

    draw(canvases) {
        this.sprite.draw(canvases, this.canvas, this.position.x, this.position.y,this.index);
    }
}



