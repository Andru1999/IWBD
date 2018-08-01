"use strict";

class World {
    constructor(map, heroes_count, monsters_count, battleType) {
        this.characterClasses = [this.generateTank,this.generateArcher,this.generateKnight,this.generateWizard];
        this._battleType = battleType;
        this._map = map;
        this._units = getVector2(2, 1);
        this._dungeon=1;
        this._units[0] = this.spawnUnits(heroes_count, "hero", 0);
        let scndTeamCoord;
        let fstTeamCoord = this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null);
        if (battleType == 0) {
            this._units[1] = this.spawnUnits(monsters_count, "mob", 1);
            scndTeamCoord = this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1),
                monsters_count * 10, null, null);
        }
        if (battleType == 1) {
            this._units[1] = this.spawnUnits(monsters_count, "hero", 1);
            scndTeamCoord = this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1),
                monsters_count, null, null);
        }
        this.placeUnits(fstTeamCoord, this._units[0]);
        this.placeUnits(scndTeamCoord, this._units[1]);
    }


    generateTank(position, objectType, team) {
        let variant = 0;
        let walkable = false;
        let armor = getRandomInt(30, 50);
        let baseDamage = getRandomInt(1, 3);
        let actionPoints = 2;
        let speed = getRandomInt(1, 4);
        let strength = getRandomInt(15, 20);
        let dexterity = getRandomInt(3, 6);
        let intelligence = 2;
        let rangeVision = 4;
        let basicCharacteristic = 0;
        let hitPoint = getRandomInt(30, 50);
        let attackRange = 1;
        let name = "Tank";
        let mannaPoints=4;
        let spell=selfHeal;
        return new Creature(objectType, variant, name, walkable, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision,
            basicCharacteristic, attackRange, team,mannaPoints,spell);
    }

    generateArcher(position, objectType, team) {
        let variant = 1;
        let walkable = false;
        let armor = getRandomInt(2, 6);
        let baseDamage = getRandomInt(10, 15);
        let actionPoints = 2;
        let speed = getRandomInt(1, 4);
        let strength = getRandomInt(10, 12);
        let dexterity = getRandomInt(14, 19);
        let intelligence = 2;
        let rangeVision = 10;
        let basicCharacteristic = 1;
        let hitPoint = getRandomInt(8, 10);
        let attackRange = getRandomInt(3, 5);
        let name = "Archer";
        let mannaPoints=5;
        let spell=extraActionPoints;
        return  new Creature(objectType, variant, name, walkable, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision,
            basicCharacteristic, attackRange, team,mannaPoints,spell);
    }

    generateKnight(position, objectType, team) {
        let variant = 2;
        let walkable = false;
        let armor = getRandomInt(10, 15);
        let baseDamage = getRandomInt(10, 15);
        let actionPoints = 2;
        let speed = getRandomInt(3, 5);
        let strength = getRandomInt(15, 30);
        let dexterity = getRandomInt(14, 19);
        let intelligence = 9;
        let rangeVision = 8;
        let basicCharacteristic = 0;
        let hitPoint = getRandomInt(15, 30);
        let attackRange = 1;
        let name = "Knight";
        let mannaPoints=10;
        let spell=hurricane;
        return new Creature(objectType, variant, name, walkable, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision,
            basicCharacteristic, attackRange, team, mannaPoints,spell);
    }

    generateWizard(position, objectType, team) {
        let variant = 3;
        let walkable = false;
        let armor = getRandomInt(0, 3);
        let baseDamage = getRandomInt(20, 20);
        let actionPoints = 2;
        let speed = getRandomInt(1, 3);
        let strength = getRandomInt(4, 5);
        let dexterity = getRandomInt(4, 5);
        let intelligence = getRandomInt(15, 45);
        let rangeVision = 12;
        let basicCharacteristic = 2;
        let hitPoint = getRandomInt(15, 30);
        let attackRange = getRandomInt(15, 30);
        let name = "Wizard";
        let mannaPoints=30;
        let spell=massHeal;
        return  new Creature(objectType, variant, name, walkable, position, hitPoint, armor, baseDamage,
            actionPoints, speed, strength, dexterity, intelligence, rangeVision,
            basicCharacteristic, attackRange, team, mannaPoints,spell);
    }

    spawnUnits(count, type, team) {
        let units = [];
        for (let i = 0; i < count; i++) {
            let unit = this.characterClasses[getRandomInt(0,1000) % this.characterClasses.length](new Position(),type,team);
            units.push(unit);
        }
        return units;
    }

    placeUnits(coordinates, unitsArr) {
        for (let i = 0; i < unitsArr.length && coordinates.length; i++) {
            let currentIndex = getRandomInt(0, coordinates.length);
            let unitPos = coordinates[currentIndex];
            unitPos.wayLength = 0;
            unitPos.previousIndexInQ = -1;
            unitsArr[i]._position = unitPos;
            this._map._cells[unitPos.x][unitPos.y][unitPos.z] = unitsArr[i];
            coordinates.splice(currentIndex, 1);
        }
    }

}
