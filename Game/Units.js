/**
 * Базовый класс с описанием главного героя
 */
class MainHero extends BaseUnit {
    /**
     * Создает экземпляр BaseUnit.
     *
     * @constructor
     * @this  {MainHero}
     * @param {Position} position - Позиция главного героя.
     * @param {BaseWeapon} weapon - Оружие главного героя.
     * @param {BaseArmor} armor   - Броня главного героя.
     */
    constructor(position, weapon, armor) {
        super(position, weapon, armor, 2);
    }
}

/**
 * Базовый класс для всех мобов в игре
 */
class BaseMob extends BaseUnit {
    /**
     * Создает экземпляр BaseMob.
     *
     * @constructor
     * @this  {BaseMob}
     * @param {Position} position - Позиция моба.
     * @param {BaseWeapon} weapon - Оружие моба.
     * @param {BaseArmor} armor   - Броня моба.
     */
    constructor(position, weapon, armor) {
        super(position, weapon, armor, 2);
    }
}

