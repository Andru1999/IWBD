"use strict"
// JavaScript source code
let gameWorld;
let heroes = [];
let monsters;
let currentMob=null;
let actionType;//0 - nothing , 1 - move , 2 - attack

function getActionType() {
    return actionType;
}

function setActionType(x) {
    actionType = x;
}

function getMonsters() {
    return monsters;
}

function setMonsters(x) {
    monsters = x;
}

function getCurrentMob() {
    return currentMob;
}

function setCurrentMob(x) {
    currentMob = x;
}

function getHeroes() {
    return heroes;
}

function setHeroes(x) {
    heroes = x;
}

function getGameWorld() {
    return gameWorld;
}

function setGameWorld(x) {
    heroes = x;
}



function Start(){
    gameWorld= new GameMap(getRandomInt(25, 50),getRandomInt(25, 50),3);
    gameWorld.generateMap();
    spawnHeroes(1);
    //spawnMonsters();
}

function createMob(position)
{
    let id = getRandomInt(0, HeroesTextureArray.length);
    let name = "mob";
    let texture = new Sprite(HeroesTextureArray[id], new PositionOnCanvas(position.coordinates[0], position.coordinates[1]));
    let walkable = true;
    let armor = getRandomInt(1, 20);
    let baseDamage = getRandomInt(1, 8);
    let actionPoints = getRandomInt(5, 10);
    let speed = getRandomInt(1, 4);
    let strength = getRandomInt(5, 20);
    let dexterity = getRandomInt(5, 20);
    let intelligence = getRandomInt(5, 20);
    let perception = getRandomInt(5, 9);
    let entiteType = getRandomInt(0, 3);
    let hitPoint = getRandomInt(5, 20);
    let attackRange = 1;
    if (entiteType != 0) {
        attackRange = perception;
    }
    return (new Entity(position, id, name, texture, walkable, hitPoint, armor, baseDamage, actionPoints, speed, strength, dexterity, intelligence, perception, entiteType, attackRange));
}

function spawnHeroes(count){
    for (let i=1; i<=count; i++){
        for (let j=1; j<=count; j++){
            heroes.push(createMob(new Position(i,j,1,0,-1)))
            gameWorld._state[i][j][1]=heroes[heroes.length-1];
        }
    }
}

function spawnMonsters(count){
    for (let i=1; i<=count; i++){
        for (let j=1; j<=count; j++){
            monsters.push(createMob(new Position(i,j,1,0,-1)))
            gameWorld._state[i][j][1]=monsters[monsters.length-1];
        }
    }
}

function getClick(x,y,mouseButton){
    if (currentMob!=null  && currentMob._actionPoints>0) {
        if (mouseButton = 1) {
            switch (actionType) {
                case '0':
                    return "nothing";
                    break;

                case '1':
                    if (gameWorld._state[x][y][1] == null || gameWorld._state[x][y][1]._walkable == true) {
                        gameWorld.move(currentMob._position, new Position(x, y, 1, 0, -1));
                        currentMob._actionPoints--;
                        return "move successfully";
                    }
                    else return "move unsuccessfully"
                    break;

                case '2':
                    if (gameWorld._state[x][y][1] != null && gameWorld._state[x][y][1]._name == "mob") {
                        currentMob._actionPoints--;
                        gameWorld._state[x][y][1].takeDamage(currentMob.calcDamage());
                        return "attack successfully"
                    }
                    else return "unsuccessfully";
                    break;
            }
        }
    }
    if (mouseButton=0) {
        if (gameWorld._state[x][y][1] != null && gameWorld._state[x][y][1]._name == "mob") {
            currentMob = gameWorld._state[x][y][1];
        }
    }
}


function Update(){

}

