/**
 * Класс котрой позваляет создать бесконечный цикл для анимации
 * на основе встроенного в браузер requestAnimFrame
 */
class AnimationLoop {
    /**
     * Создаёт объект AnimationLoop
     * На вход принимает функцию которой будет передана
     * дельта между вызовами этой фсамой функции.
     * !! Первый раз будет передан 0
     *
     * @constructor
     * @this {AnimationLoop}
     * @param {function} func - Функция которая будет вызваться
     */
    constructor(func) {
        this.func = func;
        this.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    }

    /**
     * Запускает бесконечный цикл
     *
     * @this {AnimationLoop}
     */
    start() {
        var external_this = this; // Необходим для решения проблемы с вызовом методо внутри requestAnimFrame
        this.requestAnimationFrame.call(window, (curentTime) => {
            external_this._loop(curentTime);
        });
    }

    /**
     * Бесконечный цикл
     *
     * @this {AnimationLoop}
     * @param {number} lastTime - Время последнего вызова функции
     * по умолчанию текущее.
     */
    _loop(lastTime = Date.now()) {
        var external_this = this; // Необходим для решения проблемы с вызовом методо внутри requestAnimFrame
        this.func((Date.now() - lastTime) / 1000);
        this.requestAnimationFrame.call(window, (curentTime) => {
            external_this._loop(curentTime);
        });
    }
}