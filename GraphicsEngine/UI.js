/**
 * Базовый класс от которого наследуются все пользовательские интерфейсы
 * @property {Game} game - Инстанс текущей игры
 */
class UI{
    /**
     * @constructor
     * @this {UI}
     * @param {Game} game - Инстанс текущей игры
     */
    constructor(game){
        this.game = game;
    }
}