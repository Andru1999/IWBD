/**
 * Класс представляющий собой инфопанель
 *
 * @property {engine} engine - Движок игры
 * @property {Array.<string>} - Массив строк содержащий информацию по клетке
 */
class InfoPanel {
    /**
     * Создаёт инстанс InfoPanel
     *
     * @this {InfoPanel}
     * @constructor
     * @param {SpaceWorld} engine - Движок игры
     */
    constructor(engine) {
        this.engine = engine;
        this.ctx = $("#info_game_canvas")[0].getContext("2d");
        this.background = new Image();
        this.background.src = "Assets/BackgroundOfInfo.jpeg";
        //Костыль
        let t_this = this;
        this.background.onload = function () {
            t_this.background_loaded = true;
        };

        this.background_loaded = false;

    }

    /**
     * Метод выполняющий отрисовку данных актуальных
     * на момент последнего вызова update() метода.
     *
     * @this {InfoPanel}
     * @param {Map.<string,ctx>} ctxes - Канвас на котором надо отрисовать информацию
     */
    drow(sprites,canvases) {
        if (!this.background_loaded) {
            return;
        }

        this.ctx.fillStyle = "#00F";
        this.ctx.strokeStyle = "#F00";
        this.ctx.font = "italic 25pt Arial";

        this.ctx.drawImage(this.background, 0, 0);
        var info = this.engine.getCurSelectedObjInf();
        if (info) {
            sprites[info._objectType][info._variant].draw(canvases, "infoCanvas", 20, 50, 0);
            this.ctx.fillText("Class : " + info._name, 20, 150);
            this.ctx.fillText("HP : " + Math.ceil(info._hitPoint), 20, 200);
            this.ctx.fillText("MP : " + Math.ceil(info._mannaPoints), 20, 250);
            this.ctx.fillText("AP : " + Math.ceil(info._actionPoints), 20, 300);
            if(typeof(info._spell)=="string")
                this.ctx.fillText("Spell : " + info._spell, 20, 350);
            else
            {   let buf=info._spell.name;
                this.ctx.fillText("Spell : " + buf, 20, 350);
            }
        }



        // Получаем информацию о ctx для настройки отображения данных

    }
}