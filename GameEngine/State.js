/**
 * Класс в котром описывает текущее состояни игры
 *
 * @property {BaseUnit} allies - Массив союзников
 * @property {BaseUnit} enemies - Массив врагов
 */
class State{
    /**
     * @constructor
     * @this {State}
     * @param {BaseUnit} allies - Список союзников на карте
     * @param {BaseUnit} enemies - Список врагов на карте
     */
    constructor(allies, enemies){
        this.allies = allies;
        this.enemies = enemies;
        // Добавить волшебные предметы
    }
}