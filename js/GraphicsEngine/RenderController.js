class RenderController {
    constructor(arr)
    {
        this.BaseSpritesArr = arr;
    }

    renderSprite(type, variant, canvas, x, y){
        (this.sprites[type][(Math.abs(variant)%this.sprites[type].length)]).draw(canvas,x,y); // Символ дибилизма
        //Отрисовка справйта
    }

}