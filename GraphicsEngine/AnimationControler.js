"use strict";
class AnimationControler
{
    constructor(sprites)
    {
        this.sprites = sprites;
        this.animArray = [];
    }
    update(dt,animArr)
    {
        for (let i=0; i<this.animArray.length;i++)
        {
            let res = this.animArray[i].update(dt);
            if (res == "end") {
                this.animArray.splice(i, 1);
            }
        }
        for (let newAnim of animArr)
        {
            this.addAnimation(new PositionOnCanvas(newAnim.x,newAnim.y),newAnim.type,newAnim.variant,2,1);
        }
    }
    addAnimation(position,type,variant,speed,number)
    {
        this.animArray.push(new BaseAnimation(this.sprites[type][variant],position,speed,number));
    }
}
