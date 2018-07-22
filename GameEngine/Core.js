"use strict";

// JavaScript source code
function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min * 1.0);
}

class Position {
    constructor(x, y, z, wayLenght, previousIndexInQ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.wayLenght = wayLenght;
        this.previousIndexInQ = previousIndexInQ;
    }
}

function getVector3(x, y, z) {
    let arr = new Array(x);
    for (let i = 0; i < x; i++) {
        arr[i] = new Array(y);
        for (let j = 0; j < y; j++)
            arr[i][j] = new Array(z);
    }
    return arr;
}

class GameMap {
    constructor(width, height, depth) {
        this._height = height;
        this._width = width;
        this._depth = depth;
        this._cells = getVector3(width, height, depth);
        this.generateMap();
    }

    generateMap() {
        let variant = getRandomInt(0, 3);
        let wall = new GameObject("wall", variant, "wall", false, 1);
        let floor = new GameObject("floor", variant, "floor", true, 1);

        for (let i = 0; i < this._cells.length; i++) {
            for (let j = 0; j < this._cells[i].length; j++) {
                this._cells[i][j][0] = floor;
            }
        }

        for (let i = 0; i < this._width; i++) {//make walls
            this._cells[i][0][2] = wall;
        }
        for (let i = 0; i < this._width; i++) {
            this._cells[i][(this._height - 1)][2] = wall;
        }
        for (let i = 0; i < this._height; i++) {
            this._cells[0][i][2] = wall;
        }
        for (let i = 0; i < this._height; i++) {
            this._cells[this._width - 1][i][2] = wall;
        }


        for (let i = 0; i < this._width * this._height / 100; i++) {
            let randomPosition = new Position(getRandomInt(1, this._width - 1), getRandomInt(1, this._height - 1), 2, 0, -1);
            let obstacle = this.allAdmissibleCells(randomPosition, getRandomInt(1, 5));
            for (let i = 0; i < obstacle.length; i++) {
                this._cells[obstacle[i].x][obstacle[i].y][obstacle[i].z] = wall;
            }
        }

        for (let i = 1; i < this._width - 1; i++) {
            this._cells[i][1][2] = null;
        }
        for (let i = 1; i < this._width - 1; i++) {
            this._cells[i][this._height - 2][2] = null;
        }
        for (let i = 1; i < this._height - 1; i++) {
            this._cells[1][i][2] = null;
        }
        for (let i = 1; i < this._height - 1; i++) {
            this._cells[this._width - 2][i][2] = null;
        }

    }

    findWay(queue, point) {
        let currentIndex;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].coordinates.x == point.coordinates.x
                && queue[i].coordinates.y == point.coordinates.y
                && queue[i].coordinates.y == point.coordinates.y) {
                currentIndex = i;
                break;
            }
        }
        let wayPoints = new Array();
        while (queue[currentIndex].previousIndexInQ != -1) {
            wayPoints.push(queue[currentIndex]);
            currentIndex = queue[currentIndex].previousIndexInQ;
        }
        wayPoints.push(queue[currentIndex]);
        return (wayPoints);
    }

    allAdmissibleCells(position, dist) {
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
            if (queue[l].wayLenght * 1.0 >= dist * 1.0) continue;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let currentCoord = new Position(
                        queue[l].x * 1.0 + moveSetX[i] * 1.0,
                        queue[l].y * 1.0 + moveSetY[j] * 1.0,
                        queue[l].z * 1.0, queue[l].wayLenght + 1, l);

                    if (_visitid[currentCoord.x][currentCoord.y][currentCoord.z] === false) {
                        let curObj = this._cells[currentCoord.x][currentCoord.y][currentCoord.z];
                        if (curObj == null || curObj._walkable) {
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
        if (currentObject._position)
            currentObject._position = to;
        this._cells[to.x][to.y][to.z] = currentObject;
        this._cells[from.x][from.y][from.z] = null;
    }
}

class GameObject {
    constructor(objectType, variant, name, walkable, visibility) {
        this._objectType = objectType;
        this._variant = variant;
        this._name = name;
        this._walkable = walkable;
        this._visibility = visibility ? visibility : 1;
    }
}


class Creature extends GameObject {

    constructor(objectType, variant, name, walkable, visibility, position, hitPoint, armor, baseDamage,
                actionPoints, speed, strength, dexterity, intelligence, rangeVision, creatureType, attackRange) {
        super(objectType, variant, name, walkable, visibility);
        this._position = position;
        this._hitPoint = hitPoint;
        this._armor = armor;
        this._baseDamage = baseDamage;
        this._actionPoints = actionPoints;
        this._speed = speed;
        this._strength = strength;
        this._dexterity = dexterity;
        this._intelligence = intelligence;
        this._rangeVision = rangeVision;
        this._creatureType = creatureType;
        this._attackRange = attackRange;
    }

    takeDamage(damage) {
        if (this._dexterity < getRandomInt(0, 100)) {
            this._hitPoint = this._hitPoint - damage * this._armor / 100;
            return "попал"
        }
        else {
            return "уклонился"
        }
    }

    calcDamage() {
        switch (this._creatureType) {
            case 0:
                return this._strength * this._baseDamage;
                break;

            case 1:
                return this._dexterity * this._baseDamage;
                break;

            case 2:
                return this._intelligence * this._baseDamage;
                break;

            default:
                return this._baseDamage;
                break;
        }
    }
}


