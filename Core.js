"use strict"
// JavaScript source code
function getRandomInt(min, max){
    var x=0;
    x=(Math.floor(Math.random() * (max - min ))*1.0 + min*1.0);
    return x;
}

class Position{
    constructor(x,y,z,wayLenght,previousIndexInQ){
        this.coordinates=new Array(3);
        this.coordinates[0]=x;
        this.coordinates[1]=y;
        this.coordinates[2]=z;
        this.wayLenght=wayLenght;
        this.previousIndexInQ=previousIndexInQ;
    }
}

class GameMap {
    constructor(width, height , depth) {
        this._height = height;
        this._width = width;
        this._depth = depth;
        this._cells = new Array(this._width);
        for (let i = 0; i < this._cells.length; i++)
        {
            this._cells[i] = new Array(this._height);
            for (let j = 0; j < this._cells[i].length; j++)
            {
                this._cells[i][j] = new Array(this._depth);
            }
        }
        this.generateMap();
    }
    
    generateMap(){
		let variant;
		variant=getRandomInt(0,3);
		let wall=new GameObject ("wall",variant,"wall",false,1);
		let floor=new GameObject ("floor",variant,"floor",true,1);
		
		for (let i=0;i<this._cells.length;i++){
           for (let j=0;j<this._cells[i].length;j++){
               this._cells[i][j][0]=floor;
           }
		}
	   
	   
	   for (let i=0;i<this._width;i++){//make walls
           this._cells[i][0][2]=wall;
       }
	   for (let i=0;i<this._width;i++){
           this._cells[i][(this._height-1)][2]=wall;
       }
	   for (let i=0;i<this._height;i++){
           this._cells[0][i][2]=wall;
       }
	   for (let i=0;i<this._height;i++){
           this._cells[this._width-1][i][2]=wall;
       }
	   
	   
	   for (let i=0;i<this._width*this._height/100;i++){  
		   let randomPosition=new Position(getRandomInt(1,this._width-1),getRandomInt(1,this._height-1),2,0,-1);
		   let obstacle=this.allAdmissibleCells(randomPosition,getRandomInt(1,5));
		   for (let i=0;i<obstacle.length;i++){
				   this._cells[obstacle[i].coordinates[0]][obstacle[i].coordinates[1]][obstacle[i].coordinates[2]]  = wall;
				}
	   }
	   
	   for (let i=1;i<this._width-1;i++){
           this._cells[i][1][2]=null;
       }
	   for (let i=1;i<this._width-1;i++){
           this._cells[i][this._height-2][2]=null;
       }
	   for (let i=1;i<this._height-1;i++){
           this._cells[1][i][2]=null;
       }
	   for (let i=1;i<this._height-1;i++){
           this._cells[this._width-2][i][2]=null;
       }
	   
    }

    /*findWay(queue, point) { //не сделал ещё
        let currentIndex;
        for (let i=0;i<queue.length;i++){
            if (queue[i].coordinates==point.coordinates){
                currentIndex=i;
                break;
            }
        }
        let wayPoints= new Array();
        while (queue[currentIndex].previousIndexInQ!=-1)
        {
            wayPoints.push(queue[currentIndex]);
            currentIndex=queue[currentIndex].previousIndexInQ;
        }
        wayPoints.push(queue[currentIndex]);
        return(wayPoints);
    }*/

    allAdmissibleCells(position, dist) {
		let _visitid = new Array(this._width);
        for (let i = 0; i < _visitid.length; i++)
        {
            _visitid[i] = new Array(this._height);
            for (let j = 0; j < _visitid[i].length; j++)
            {
                _visitid[i][j] = new Array(this._depth);
				for (let k=0; k<_visitid[i][j].length;k++)
				{
					_visitid[i][j][k]=false;
				}
            }
        }
        let moveSetX = [-1, 0, 1];
        let moveSetY = [-1, 0, 1];
        let queue= [];
        _visitid[position.coordinates[0]][position.coordinates[1]][position.coordinates[2]]=true;
        queue.push(position);
        for (let l=0; l <queue.length; l++) {
            if (queue[l].wayLenght * 1.0 < dist * 1.0) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let currentCoord = new Position(queue[l].coordinates[0] * 1.0 + moveSetX[i] * 1.0, queue[l].coordinates[1] * 1.0 + moveSetY[j] * 1.0, queue[l].coordinates[2] * 1.0, queue[l].wayLenght+1,l);
                        if (_visitid[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0] === false) {
                            if (this._cells[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0] === null) {
                                    queue.push(currentCoord);
                            }
                            else{
                                if (this._cells[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0]._walkable === true) {
                                        queue.push(currentCoord);
                                }
                            }
                                _visitid[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0] = true;
                        }
                    }
                }
            }
        }
        return queue;
    }

    move (from,to){
		let currentObject =this._cells[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]];
		if (currentObject._objectType==="hero" || currentObject._objectType==="mob"){
			currentObject._position=to;
		}
        this._cells[to.coordinates[0]][to.coordinates[1]][to.coordinates[2]] = currentObject;
		this._cells[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]]=null;
    }
	
	sendInf(){
		for (let z=0; z<this._depth;z++){
			for (let y=0; y<this._height;y++){
				for (let x=0; x<this._width;x++){
					let currentObject=this._cells[x][y][z];
					renderSprite(currentObject._objectType,currentObject._variant,x,y);
				}
			}
		}	
	}
}

class GameObject {
    constructor(objectType,variant,name,walkable,visibility){
		this._objectType = objectType;
		this._variant=variant;
        this._name = name;
        this._walkable = walkable;
		this._visibility = visibility ? visibility : 1;
    }
}


class Creature extends  GameObject{

    constructor(objectType,variant,name,walkable,visibility,position,hitPoint,armor,baseDamage,
	actionPoints,speed,strength,dexterity,intelligence,rangeVision,creatureType,attackRange){
        super(objectType,variant,name,walkable,visibility);
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

    takeDamage (damage){
        if (this._dexterity<getRandomInt(0,100)){
            this._hitPoint=this._hitPoint-damage*this._armor/100;
            return "попал"
        }
        else{
            return "уклонился"
        }
    }

    calcDamage (){
        switch(this._creatureType) {
            case '0':
                return this._strength * this._baseDamage;
                break;

            case '1':
                return this._dexterity*this._baseDamage;
                break;

            case '2':
                return this._intelligence*this._baseDamage;
               break;

            default:
                return this._baseDamage;
                break;
        }
    }
}









