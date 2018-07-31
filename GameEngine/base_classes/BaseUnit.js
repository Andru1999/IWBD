/**
 * Базовый класс для описания всех юнитов
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