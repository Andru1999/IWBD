/**
 * Класс представляющий собой действие перемещения
 *
 * @property {BaseUnit} unit - unit котроый необходимо переместить
 * @property {Position} position - Позиция в которую надо переместиться
 */
class ActionMove extends BaseAction {
    /**
     * Создает экземпляр ActionMove.
     *
     * @constructor
     * @this  {ActionMove}
     * @param {BaseUnit} unit - Юнит которого надо переместить.
     * @param {BaseUnit} position - Позиция куда следует переместить героя.
     */
    constructor(unit, position) {
        super(unit);
        this.position = position;
    }
}


/**
 * Класс представляющий собой действие атаки
 *
 * @property {BaseUnit} unit - unit котроый производит атаку
 * @property {Position} position - Позиция по которой наноситься атака
 */
class ActionAttack extends BaseAction {
    /**
     * Создает экземпляр ActionAttack.
     *
     * @constructor
     * @this  {ActionAttack}
     * @param {BaseUnit} unit - Атакующий юнит.
     * @param {Position} position - Клетка которую атакуем.
     */
    constructor(unit, position) {
        super(unit);
        this.position = position;
    }
}