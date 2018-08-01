/**
 * Базовый класс всех юнитов
 *
 * @property {Position} position - Текущая позиция юнита.
 * @property {BaseWeapon} weapon - Текущее оружие юнита.
 * @property {BaseArmor} armor   - Текущая броня юнита.
 * @property {number} max_distance_traveled - Максимальная дистанция перемещения юнита.
 */
class BaseUnit {
    /**
     * Создает экземпляр BaseUnit.
     *
     * @constructor
     * @this  {BaseUnit}
     * @param {Position} position - Текущая позиция юнита.
     * @param {BaseWeapon} weapon - Текущее оружие юнита.
     * @param {BaseArmor} armor   - Текущая броня юнита.
     * @param {number} max_distance_traveled - Максимальная дистанция перемещения юнита.
     */
    constructor(position, weapon = null, armor = null, max_distance_traveled = 0) {
        this.position = position;
        this.weapon = weapon;
        this.armor = armor;
        this.max_distance_traveled = max_distance_traveled;
    }
}

/**
 * Базовый класс всех юнитов управляемых компьютером
 */
class BaseUnitWithAI extends BaseUnit{
    /**
     * Метод который вызвает движок для получения некоторого действия
     * выполняемого юнитом.
     *
     * @param {State} state_of_game - Текущее состояние игры
     * @return {BaseAction} - Некоторое действие которое должен совершить юнит
     */
    getAction(state_of_game){

    }
}