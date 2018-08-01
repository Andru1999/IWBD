"use strict";

class World {
    constructor(map, heroes_count, monsters_count,battleType) {

            this._battleType=battleType;
            this._map = map;
            this._units = getVector2(2,1)
        if (battleType==0) {
            this._units[0] = this.spawnUnits(heroes_count, "hero", 0);
            this._units[1] = this.spawnUnits(monsters_count, "mob", 1);

            var fstTeamCoord=this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null);
            var scndTeamCoord=this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1), monsters_count * 10, null, null);
            this. placeUnits(fstTeamCoord,this._units[0]);
            this. placeUnits(scndTeamCoord,this._units[1]);
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
        let rangeVision = 99;
        let basicCharacteristic = 2;
        let hitPoint = getRandomInt(5, 20);
        let attackRange = 1;
        let visibility = 1;
        if (basicCharacteristic != 0) {
            attackRange = 5;
        }
        let mob = new Creature(objectType, variant, name, walkable, visibility, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision, basicCharacteristic, attackRange,team);
        return mob;
    }

    spawnUnits(count, type, team) {
        let units = [];
        for (let i = 0; i < count; i++) {
            let unit = this.generateUnit(new Position(), type, type,team);
            units.push(unit);
        }
        return units;
    }

    placeUnits(coordinates,unitsArr){
        for (let i = 0; i < unitsArr.length && coordinates.length; i++) {
            let curentIndex = getRandomInt(0, coordinates.length);
            let unitPos = coordinates[curentIndex];
            unitPos.wayLength = 0;
            unitPos.previousIndexInQ = -1;
            let unit = unitsArr[i];
            unit._position=unitPos;
            this._map._cells[unitPos.x][unitPos.y][unitPos.z] = unit;
            coordinates.splice(curentIndex, 1);
        }
    }

}
