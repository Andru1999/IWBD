"use strict"
// JavaScript source code
var gameWorld; 
var heroes = [];
var monsters;

function Start(){
	gameWorld= new GameMap(getRandomInt(25, 50),getRandomInt(25, 50),3);
	gameWorld.generateMap();
	spawnHeroes(1);
	//spawnMonsters();
}

function createMob(position)
{
	let id = getRandomInt(0, HeroesTextureArray.length);
	let name = "PLAYER";
	let texture = new Sprite(HeroesTextureArray[id], new PositionOnCanvas(position.coordinates[0] * 32, position.coordinates[1] * 32));
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



function Update(){
	
}

