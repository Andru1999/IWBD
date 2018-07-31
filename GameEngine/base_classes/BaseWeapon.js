/**
 * @description - Базовый класс для представления всех типов оружия
 */
class BaseWeapon {
    /**
     * @constructor
     * @this {BaseWeapon}
     * @param {number} damage - Урон наносимый оружием
     * @param {number} distance - Расстояние на которе оружие может наносить урон
     */
    constructor(damage,distance){
        this.damage = damage;
        this.distance = distance;
    }
}