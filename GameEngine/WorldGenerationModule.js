"use strict";

class World {
    constructor(map, heroes_count, monsters_count) {
        this._map = map;
        this._heroes = this.spawnUnits(heroes_count, "hero");
        this._monsters = this.spawnUnits(monsters_count, "mob");
    }

    generateUnit(position, name, objectType) {
        let variant = getRandomInt(0, 50);
        let walkable = false;
        let armor = getRandomInt(1, 20);
        let baseDamage = getRandomInt(1, 8);
        let actionPoints = getRandomInt(5, 10);
        let speed = getRandomInt(1, 4);
        let strength = getRandomInt(5, 20);
        let dexterity = getRandomInt(5, 20);
        let intelligence = getRandomInt(5, 20);
        let rangeVision = getRandomInt(5, 9);
        let creatureType = getRandomInt(0, 3);
        let hitPoint = getRandomInt(5, 20);
        let attackRange = 1;
        let visibility = 1;
        if (creatureType != 0) {
            attackRange = rangeVision;
        }
        let mob = new Creature(objectType, variant, name, walkable, visibility, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision, creatureType, attackRange);
        return mob;
    }

    spawnUnits(count, type) {
        let units = [];
        for (let i = 1; i <= count; i++)
            for (let j = 1; j <= count; j++) {
                let unitPos = new Position(i, j, 2, 0, -1);
                units.push(this.generateUnit(unitPos, type, type));
                this._map._cells[i][j][2] = units[units.length - 1];
            }
        return units;
    }


}
