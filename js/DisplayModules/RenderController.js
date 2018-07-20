class RenderController {
    constructor() {
        //Здесь создаётся sprites_by_type = {}
        // С текстурами сгрупированными по типу
    }

    renderSprite(type,variant,x,y){
        variant = Math.abs(variant)%this.sprites[type].length; // Символ дибилизма
        //Отрисовка справйта
    }

}