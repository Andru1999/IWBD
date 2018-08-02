"use strict";

// JavaScript source code
function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min * 1.0);
}

class Position {
    constructor(x, y, z, wayLength, previousIndexInQ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.wayLength = wayLength;
        this.previousIndexInQ = previousIndexInQ;
    }
}

function getVector3(x, y, z, fillObject) {
    let arr = new Array(x);
    for (let i = 0; i < x; i++) {
        arr[i] = new Array(y);
        for (let j = 0; j < y; j++) {
            arr[i][j] = new Array(z);
            if (fillObject)
                for (let k = 0; k < z; k++) {
                    arr[i][j][k] = new fillObject;
                }
        }
    }
    return arr;
}

function getVector2(x, y, fillObject) {
    let arr = new Array(x);
    for (let i = 0; i < x; i++) {
        arr[i] = new Array(y);
        if (fillObject)
            for (let j = 0; j < y; j++) {
                arr[i][j] = new fillObject;
            }
    }
    return arr;
}

class cellVisibility {
    constructor() {
        this._wasDiscovered = false;
        this._visibleLinks = 0;
    }
}

class GameMap {
    constructor(width, height, depth) {
        this._height = height;
        this._width = width;
        this._depth = depth;
        this._cells = getVector3(width, height, depth);
        this._visionField = getVector3(width, height, 2,cellVisibility);
        this.generateMap();
    }

    getMapSize() {
        return {width: this._width, height: this._height, depth: this._depth};
    }

    fillMap(firstPos, secondPos, environmentObject) {
        for (let x = firstPos.x; x <= secondPos.x; x++)
            for (let y = firstPos.y; y <= secondPos.y; y++)
                for (let z = firstPos.z; z <= secondPos.z; z++)
                    this._cells[x][y][z] = environmentObject;
    }

    generateMap() {
        let variant = getRandomInt(0, 3);
        let wall = new GameObject("wall", variant, "wall", false, 1);
        let floor = new GameObject("floor", variant, "floor", true, 1);

        this.fillMap(new Position(0, 0, 0), new Position(this._width - 1, this._height - 1, 0), floor);
        this.fillMap(new Position(0, 0, 2), new Position(this._width - 1, 0, 2), wall);
        this.fillMap(new Position(0, this._height - 1, 2), new Position(this._width - 1, this._height - 1, 2), wall);
        this.fillMap(new Position(0, 0, 2), new Position(0, this._height - 1, 2), wall);
        this.fillMap(new Position(this._width - 1, 0, 2), new Position(this._width - 1, this._height - 1, 2), wall);

        for (let i = 0; i < this._width * this._height / 30; i++) {
            let randomPosition = new Position(getRandomInt(1, this._width - 1), getRandomInt(1, this._height - 1), 2, 0, -1);
            let obstacle = this.allAdmissibleCells(randomPosition, getRandomInt(1, 3));

            for (let i = 0; i < obstacle.length; i++) {
                this._cells[obstacle[i].x][obstacle[i].y][obstacle[i].z] = wall;
            }
        }

        this.fillMap(new Position(1, 1, 2), new Position(this._width - 2, 1, 2), null);
        this.fillMap(new Position(1, this._height - 2, 2), new Position(this._width - 2, this._height - 2, 2), null);
        this.fillMap(new Position(1, 1, 2), new Position(1, this._height - 2, 2), null);
        this.fillMap(new Position(this._width - 2, 1, 2), new Position(this._width - 2, this._height - 2, 2), null);
        this.fillMap(new Position(1, Math.round(this._height / 2), 2), new Position(this._width - 2, Math.round(this._height / 2), 2), null);
        this.fillMap(new Position(Math.round(this._width / 2), 1, 2), new Position(Math.round(this._width / 2), this._height - 2, 2), null);
    }

    findWay(queue, point) {
        let currentIndex = -1;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].coordinates.x == point.coordinates.x
                && queue[i].coordinates.y == point.coordinates.y
                && queue[i].coordinates.y == point.coordinates.y) {
                currentIndex = i;
                break;
            }
        }

        let wayPoints = [];
        while (queue[currentIndex].previousIndexInQ != -1 && currentIndex > 0) {
            wayPoints.push(queue[currentIndex]);
            currentIndex = queue[currentIndex].previousIndexInQ;
        }
        wayPoints.push(queue[currentIndex]);
        return (wayPoints);
    }

    allAdmissibleCells(position, dist, ignorType,ignorTeam) {
        let _visitid = getVector3(this._width, this._height, this._depth)

        for (let i = 0; i < _visitid.length; i++)
            for (let j = 0; j < _visitid[i].length; j++)
                for (let k = 0; k < _visitid[i][j].length; k++)
                    _visitid[i][j][k] = false;


        let moveSetX = [-1, 0, 1];
        let moveSetY = [-1, 0, 1];
        let queue = [];
        _visitid[position.x][position.y][position.z] = true;
        queue.push(position);
        for (let l = 0; l < queue.length; l++) {

            if (queue[l].wayLength * 1.0 >= dist * 1.0) continue;

            if (this._cells[queue[l].x][queue[l].y][queue[l].z] && ignorType != null //ignor object type
                && this._cells[queue[l].x][queue[l].y][queue[l].z]._objectType === ignorType) continue;

            if (this._cells[queue[l].x][queue[l].y][queue[l].z] && ignorTeam != null    //ignor team number
                && this._cells[queue[l].x][queue[l].y][queue[l].z]._team!=null
                && this._cells[queue[l].x][queue[l].y][queue[l].z]._team === ignorTeam) continue;

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {

                    let currentCoord = new Position(
                        queue[l].x * 1.0 + moveSetX[i] * 1.0,
                        queue[l].y * 1.0 + moveSetY[j] * 1.0,
                        queue[l].z * 1.0, queue[l].wayLength + 1, l);

                    if (_visitid[currentCoord.x][currentCoord.y][currentCoord.z] === false) {

                        let curObj = this._cells[currentCoord.x][currentCoord.y][currentCoord.z];

                        if (curObj == null || curObj._walkable || curObj._objectType == ignorType || (curObj._team!=null && curObj._team==ignorTeam)) {
                            queue.push(currentCoord);
                        }
                        _visitid[currentCoord.x][currentCoord.y][currentCoord.z] = true;
                    }
                }
            }
        }
        return queue;
    }

    move(from, to) {
        let currentObject = this._cells[from.x][from.y][from.z];
        if (currentObject._position) {
            currentObject._position = to;
            currentObject._position.wayLength = 0;
            currentObject._position.previousIndexInQ = -1;
        }
        this._cells[to.x][to.y][to.z] = currentObject;
        this._cells[from.x][from.y][from.z] = null;
    }
}

class GameObject {
    constructor(objectType, variant, name, walkable) {
        this._objectType = objectType;
        this._variant = variant;
        this._name = name;
        this._walkable = walkable;
    }
}


class Creature extends GameObject {
    /*(objectType, variant, name, walkable, position, hitPoint, armor, baseDamage,
                actionPoints, speed, strength, dexterity, intelligence, rangeVision, basicCharacteristic,
                attackRange,team,mannaPoints,spell) {
        super(objectType, variant, name, walkable,mannaPoints);*/
    constructor(params) {
        super(params.objectType, params.variant, params.name, params.walkable,params.mannaPoints);
        this._position = params.position;
        this._hitPoint = params.hitPoint;
        this._armor = params.armor;
        this._baseDamage = params.baseDamage;
        this._actionPoints = params.actionPoints;
        this._speed = params.speed;
        this._strength = params.strength;
        this._dexterity = params.dexterity;
        this._intelligence = params.intelligence;
        this._rangeVision = params.rangeVision;
        this._basicCharacteristic = params.basicCharacteristic;
        this._attackRange = params.attackRange;
        this._team=params.team;
        this._mannaPoints=params.mannaPoints;
        this._spell=params.spell;
    }


    takeDamage(damage) {
        if (this._dexterity < getRandomInt(0, 100)) {
            this._hitPoint = this._hitPoint - damage * (1 - this._armor / 100);
            if (this._hitPoint <= 0) return "die";
            else return "попал";
        }
        else {
            return "уклонился"
        }
    }

    calcDamage() {
        switch (this._basicCharacteristic) {
            case 0:
                return (this._strength / 100 + 1) * this._baseDamage;
                break;

            case 1:
                return (this._dexterity / 100 + 1) * this._baseDamage;
                break;

            case 2:
                return (this._intelligence / 100 + 1) * this._baseDamage;
                break;

            default:
                return this._baseDamage;
                break;
        }
    }
}

class UnitParams{
    constructor(){
        this.position=null;
        this.objectType=null;
        this.team=null;
        this.variant = null;
        this.walkable = null;
        this.armor = null;
        this.baseDamage = null;
        this.actionPoints = null;
        this.speed = null;
        this.strength = null;
        this.dexterity = null;
        this.intelligence = null;
        this.rangeVision = null;
        this.basicCharacteristic = null;
        this.hitPoint = null;
        this.attackRange =null;
        this.name = null;
        this.mannaPoints=null;
        this.spell=null;
    }
}

class Spawner{
    constructor(position,units){
        this._units=units;
        this._team=1;
        this._position=position;
        this._hitPoint=10;
        this._variant=0;
        this._objectType="spawner"
    }

    spawnUnit(x,y,z){
		return this._units[getRandomInt(0,100)%this._units.length](new Position(x,y,z),"mob",1);
    }
	
	 takeDamage(damage) {
            this._hitPoint = this._hitPoint - damage ;
            if (this._hitPoint <= 0) return "die";
            else return "попал";
    }
}


