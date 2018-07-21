class RenderManager {
    constructor(arr, canvas) {
        this.sprites = arr;
        this.canvas = canvas;
    }

    renderSprite(type, variant, x, y) {
        this.sprites[type][Math.abs(variant) % this.sprites[type].length].draw(this.canvas, x, y); // Символ дибилизма
        //Отрисовка справйта
    }
}