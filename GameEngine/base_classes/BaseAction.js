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

    /**
     * Проверяет некоторое действие на возможность
     * корректного выполнения.
     *
     * @this  {BaseAction}
     * @return {Boolean} Возвращает true или false в завсимости от выполнимост действия.
     */
    is_correct();
}