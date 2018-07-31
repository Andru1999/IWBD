/**
 * @desc - Базовый класс для представления всех типов брони
 */
class BaseArmor {
    /**
     * @constructor
     * @this {BaseArmor}
     * @param {number} impact_absorption_coefficient - Коэффициэнт поглащения урона в диапазоне
     * от 0 (не поглащет) до 1 (поглащает весь)
     */
    constructor(impact_absorption_coefficient) {
        this.impact_absorption_coefficient =
            impact_absorption_coefficient;
    }

}

