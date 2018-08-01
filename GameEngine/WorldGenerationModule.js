"use strict";

class World {
    constructor(map, heroes_count, monsters_count,battleType) {

            this._battleType=battleType;
            this._map = map;
            this._units = getVector2(2,1)
        if (battleType==0) {
            this._units[0] = this.spawnUnits(heroes_count, "hero",
                this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null), 0);
            this._units[1] = this.spawnUnits(monsters_count, "mob",
                this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1), monsters_count * 10, null, null), 1);
        }
        if (battleType==1){
            this._units[0] = this.spawnUnits(heroes_count, "hero",
                this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null), 0);
            this._units[1] = this.spawnUnits(monsters_count, "hero",
                this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1), monsters_count * 10, null, null), 1);
        }
    }

    generateUnit(position, name, objectType,team) {
        let variant = getRandomInt(0, 50);
        let walkable = false;
        let armor = getRandomInt(1, 20);
        let baseDamage = getRandomInt(1, 8);
        let actionPoints = 2;//getRandomInt(5, 10);
        let speed = getRandomInt(1, 4);
        let strength = getRandomInt(5, 20);
        let dexterity = getRandomInt(5, 20);
        let intelligence = getRandomInt(5, 20);
        let rangeVision = getRandomInt(5, 9);
        let basicCharacteristic = getRandomInt(0, 3);
        let hitPoint = getRandomInt(5, 20);
        let attackRange = 1;
        let visibility = 1;
        if (basicCharacteristic != 0) {
            attackRange = rangeVision;
        }
        let mob = new Creature(objectType, variant, name, walkable, visibility, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision, basicCharacteristic, attackRange,team);
        return mob;
    }

    spawnUnits(count, type, coordinates,team) {
        let units = [];
        for (let i = 0; i < count && coordinates.length; i++) {
            let curentIndex = getRandomInt(0, coordinates.length);
            let unitPos = coordinates[curentIndex];
            unitPos.wayLength = 0;
            unitPos.previousIndexInQ = -1;
            let unit = this.generateUnit(unitPos, type, type,team);
            units.push(unit);
            this._map._cells[unitPos.x][unitPos.y][unitPos.z] = unit;
            coordinates.splice(curentIndex, 1);

        }
        return units;
    }


}
