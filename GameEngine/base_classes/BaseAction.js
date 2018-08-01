/**
 * Базовый класс для описания действий
 */
class BaseAction {
    /**
     * Создает экземпляр BaseAction
     *
     * @constructor
     * @param {BaseUnit} unit - Юнит который выполняет действие
     */
    constructor(unit) {
        this.unit = unit;
    }
}