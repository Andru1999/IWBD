/**
 * Базовый класс от которого наследуются все пользовательские интерфейсы
 * @property {Game} game - Инстанс текущей игры
 */
class UI extends InterfaceUI {
    /**
     * @constructor
     * @this {UI}
     * @param {Game} game - Инстанс текущей игры
     */
    constructor(game) {
        super();
        this.game = game;
    }
}