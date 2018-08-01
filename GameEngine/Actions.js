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

    is_correct() {
        return this.position.x <= this.unit.max_distance_traveled &&
            this.position.y <= this.unit.max_distance_traveled;
    }
}

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

    is_correct(){
        let result = false;
        if (this.unit.weapon) {
            let weapon_distance = this.unit.weapon.distance;
            if (weapon_distance <= this.position.x &&
                weapon_distance <= this.position.y) {
                result = true;
            }
        }
        return result;
    }
}