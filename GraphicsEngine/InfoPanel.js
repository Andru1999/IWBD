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
    drow(ctxes = null) {
        if (!this.background_loaded) {
            return;
        }

        this.ctx.fillStyle = "#00F";
        this.ctx.strokeStyle = "#F00";
        this.ctx.font = "italic 30pt Arial";

        this.ctx.drawImage(this.background, 0, 0);
        var info = this.engine.getCurSelectedObjInf();
        for (var i = 0; i < info.length; i++) {
            this.ctx.strokeText(info[i], 20, 50 * (i + 1));
        }


        // Получаем информацию о ctx для настройки отображения данных

    }
}