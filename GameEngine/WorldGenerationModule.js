"use strict";

class World {
    constructor(map, heroes_count, monsters_count, battleType) {
        this.characterClasses = [this.generateTank,this.generateArcher,this.generateKnight,this.generateWizard];
        this._battleType = battleType;
        this._map = map;
        this._units = getVector2(2, 1);
        this._dungeon=1;
        this._units[0] = this.spawnUnits(heroes_count, "hero", 0);
        this._spawners=[];
        let scndTeamCoord;
        let fstTeamCoord = this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null);
        if (battleType == 0) {
            this._units[1] = this.spawnUnits(monsters_count, "mob", 1);
            scndTeamCoord = this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1),
                                                        monsters_count * 10, null, null);
            for (let i=0;i<1;i++)
                this._spawners.push(new Spawner(new Position(0,0,0),this.characterClasses));
            this.placeUnits(scndTeamCoord,this._spawners);
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
        let params = new UnitParams();
        params.position=position;
        params.objectType=objectType;
        params.team=team;
        params.variant = 0;
        params.walkable = false;
        params.armor = getRandomInt(30, 50);
        params.baseDamage = getRandomInt(1, 3);
        params.actionPoints = 2;
        params.speed = getRandomInt(1, 4);
        params.strength = getRandomInt(15, 20);
        params.dexterity = getRandomInt(3, 6);
        params.intelligence = 2;
        params.rangeVision = 4;
        params.basicCharacteristic = 0;
        params.hitPoint = getRandomInt(30, 50);
        params.attackRange = 1;
        params.name = "Tank";
        params.mannaPoints=4;
        params.spell=selfHeal;
        return new Creature(params);
    }
    
    generateArcher(position, objectType, team) {
        let params  = new UnitParams();
        params.position=position;
        params.objectType=objectType;
        params.team=team;
        params.variant = 1;
        params.walkable = false;
        params.armor = getRandomInt(2, 6);
        params.baseDamage = getRandomInt(10, 15);
        params.actionPoints = 2;
        params.speed = getRandomInt(1, 4);
        params.strength =  getRandomInt(10, 12);
        params.dexterity = getRandomInt(14, 19);
        params.intelligence = 2;
        params.rangeVision = 10;
        params.basicCharacteristic = 1;
        params.hitPoint = getRandomInt(8, 10);
        params.attackRange = getRandomInt(3, 5);
        params.name = "Archer";
        params.mannaPoints=5;
        params.spell=extraActionPoints;
        return new Creature(params);
    }

    generateKnight(position, objectType, team) {
        let params = new UnitParams();;
        params.position=position;
        params.objectType=objectType;
        params.team=team;
        params.variant = 2;
        params.walkable = false;
        params.armor = getRandomInt(10, 15);
        params.baseDamage = getRandomInt(10, 15);
        params.actionPoints = 2;
        params.speed = getRandomInt(3, 5);
        params.strength =  getRandomInt(15, 30);
        params.dexterity = getRandomInt(14, 19);
        params.intelligence = 9;
        params.rangeVision = 8;
        params.basicCharacteristic = 0;
        params.hitPoint = getRandomInt(15, 30);
        params.attackRange = 1;
        params.name = "Knight";
        params.mannaPoints=10;
        params.spell=hurricane;
        return new Creature(params);
    }

    generateWizard(position, objectType, team) {
        let params = new UnitParams();
        params.position=position;
        params.objectType=objectType;
        params.team=team;
        params.variant = 3;
        params.walkable = false;
        params.armor = getRandomInt(0, 3);
        params.baseDamage = getRandomInt(15, 20);
        params.actionPoints = 2;
        params.speed = getRandomInt(1, 3);
        params.strength =  getRandomInt(4, 5);
        params.dexterity = getRandomInt(4, 5);
        params.intelligence = getRandomInt(15, 45);;
        params.rangeVision = 12;
        params.basicCharacteristic = 2;
        params.hitPoint = getRandomInt(10, 15);
        params.attackRange = getRandomInt(15, 30);
        params.name = "Wizard";
        params.mannaPoints=30;
        params.spell=massHeal;
        return new Creature(params);
    }

    spawnUnits(count, type, team) {
        let units = [];
        for (let i = 0; i < count; i++) {
            let unit = this.characterClasses[getRandomInt(0,1000) % this.characterClasses.length](new Position(0,0,0),type,team);
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
