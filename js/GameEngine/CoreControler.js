"use strict"
let _scene = createScene();

class Scene {
    constructor(gameWorld, heroes, monsters, currentCreature, actionType, attackField, walkableField) {
        this._gameWorld = gameWorld;
        this._heroes = heroes;
        this._monsters = monsters;
        this._currentCreature = currentCreature;
        this._actionType = actionType;//0 - nothing , 1 - move , 2 - attack
        this._attackField = attackField;
        this._walkableField = walkableField;
    }
}

function createScene() {
    let gameWorld = new GameMap(getRandomInt(25, 50), getRandomInt(25, 50), 3);
    let heroesArray = spawnHeroes(5, gameWorld);
    let mobArray = spawnMob(0, gameWorld);
    return new Scene(gameWorld, heroesArray, mobArray, 0, new Array(), new Array());
}

function generateMob(position, name, objectType) {
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
    return new Creature(objectType, variant, name, walkable, visibility, position, hitPoint, armor, baseDamage,
        actionPoints, speed, strength, dexterity, intelligence, rangeVision, creatureType, attackRange);
}

function spawnHeroes(count, gameWorld) {
    let heroes = new Array();
    for (let i = 1; i <= count; i++) {
        for (let j = 1; j <= count; j++) {
            heroes.push(generateMob(new Position(i, j, 2, 0, -1)), "hero", "hero");
            gameWorld._cells[i][j][2] = heroes[heroes.length - 1];
        }
    }
    return heroes;
}

function spawnMob(count, gameWorld) {
    let monsters = new Array();
    for (let i = 1; i <= count; i++) {
        for (let j = 1; j <= count; j++) {
            monsters.push(generateMob(new Position(i, j, 2, 0, -1)), "mob", "mob");
            gameWorld._cells[i][j][2] = monsters[monsters.length - 1];
        }
    }
    return monsters;
}

function doAction(x, y, mouseButton) {
    if (_scene._currentCreature != null && _scene._currentCreature._actionPoints > 0) {
        if (mouseButton === 2) {
            switch (actionType) {
                case '0':
                    return "nothing";
                    break;

                case '1':
                    if ((_scene._gameWorld._cells[x][y][2] === null || _scene._gameWorld._cells[x][y][2]._walkable === true)
                        && (_scene._gameWorld._cells[x][y][1]._objectType === "area") && (_scene._gameWorld._cells[x][y][1]._variant === 0)) {
                        _scene._gameWorld.move(_scene._currentCreature._position, new Position(x, y, 2, 0, -1));
                        _scene._currentCreature._actionPoints--;
                        calcActionSpaces();
                        drawActionSpace();
                        return "move successfully";
                    }
                    else return "move unsuccessfully";
                    break;

                case '2':
                    if (_scene._gameWorld._cells[x][y][2] != null && _scene._gameWorld._cells[x][y][2]._objectType === "mob"
                        && _scene._gameWorld._cells[x][y][1]._objectType === "area" && _scene._gameWorld._cells[x][y][1]._variant === 1) {
                        _scene._currentCreature._actionPoints--;
                        _scene._gameWorld._cells[x][y][2].takeDamage(_scene._currentCreature.calcDamage());
                        calcActionSpaces();
                        drawActionSpace();
                        return "attack successfully";
                    }
                    else return "unsuccessfully";
                    break;
            }
        }
    }
    if (mouseButton === 0) {
        if (_scene._gameWorld._cells[x][y][1] != null && _scene._gameWorld._cells[x][y][2]._objectType === "mob") {
            _scene._currentCreature = _scene._gameWorld._cells[x][y][2];
            calcActionSpaces();
            drawActionSpace();
        }
    }
}

function calcActionSpaces() {
    for (let i = 0; i < _scene.walkableField.length; i++) {
        _scene._gameWorld._cells[_scene.walkableField[i].coordinates[0]][_scene.walkableField[i].coordinates[1]][1] = null;
    }
    for (let i = 0; i < _scene.attackField.length; i++) {
        _scene._gameWorld._cells[_scene.attackField[i].coordinates[0]][_scene.attackField[i].coordinates[1]][1] = null;
    }
    _scene.walkableField = _scene._gameWorld.allAdmissibleCells(_scene._currentCreature._position, _scene._currentCreature._speed);
    _scene.attackField = _scene._gameWorld.allAdmissibleCells(_scene._currentCreature._position, _scene._currentCreature._attackRange);
}

function drawActionSpace() {
    let attackArea = new GameObject("area", 1, "area", true, 1);
    let moveArea = new GameObject("area", 0, "area", true, 1);
    if (_scene._actionType === 1) {
        for (let i = 0; i < _scene.walkableField.length; i++) {
            _scene._gameWorld._cells[_scene._walkableField[i].coordinates[0]][_scene._walkableField[i].coordinates[1]][1] = moveArea;
        }
    }
    if (_scene._actionType === 2) {
        for (let i = 0; i < _scene.attackField.length; i++) {
            _scene._gameWorld._cells[_scene._attackField[i].coordinates[0]][_scene._attackField[i].coordinates[1]][1] = attackArea;
        }
    }
}

function changeAction(x) {
    _scene.actionType = x;
    drawActionSpace();
}