"use strict"
// JavaScript source code
function getRandomInt(min, max)
{
    var x=0;
    x=(Math.floor(Math.random() * (max - min ))*1.0 + min*1.0);
    return x;
}

class Position {
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
        this._state = new Array(this._width);
        for (let i = 0; i < this._state.length; i++)
        {
            this._state[i] = new Array(this._height);
            for (let j = 0; j < this._state[i].length; j++)
            {
                this._state[i][j] = new Array(this._depth);
            }
        }
    }
    
    generateMap(){
		let ID;
		ID=getRandomInt(0,FloorsArray.length);

       for (let i=0;i<this._state.length;i++){
           for (let j=0;j<this._state[i].length;j++){
               this._state[i][j][0]=new floorEnvironment (ID*1,"floor",new Sprite(FloorsArray[ID],new PositionOnCanvas(i,j)));
           }
       }
	   
	   
	   for (let i=0;i<this._width;i++){//make walls
           this._state[i][0][1]=new wallsEnvironment (ID,"wall",new Sprite(WallsArray[ID],new PositionOnCanvas(i,0)));
       }
	   for (let i=0;i<this._width;i++){
           this._state[i][(this._height-1)][1]=new wallsEnvironment (ID,"wall",new Sprite(WallsArray[ID],new PositionOnCanvas(i,this._height-1)));
       }
	   for (let i=0;i<this._height;i++){
           this._state[0][i][1]=new wallsEnvironment (ID,"wall",new Sprite(WallsArray[ID],new PositionOnCanvas(0,i)));
       }
	   for (let i=0;i<this._height;i++){
           this._state[this._width-1][i][1]=new wallsEnvironment (ID,"wall",new Sprite(WallsArray[ID],new PositionOnCanvas(this._width-1,i)));
       }
	   
	   for (let i=0;i<this._width*this._height/100;i++){
		   
		   let randomPosition=new Position(getRandomInt(1,this._width-1),getRandomInt(1,this._height-1),1,0,-1);
		   
		   let _wall=this.allAdmissibleCells(randomPosition,getRandomInt(1,5));
		   for (let i=0;i<_wall.length;i++){
				   this._state[_wall[i].coordinates[0]][_wall[i].coordinates[1]][_wall[i].coordinates[2]]  =new wallsEnvironment (0,"wall",new Sprite(WallsArray[getRandomInt(0,WallsArray.length)],new PositionOnCanvas(_wall[i].coordinates[0],_wall[i].coordinates[1])));
				}
	   }
	   
    }

    findWay(queue, point) {
        let currentIndex;
        for (let i=0;i<queue.length;i++){
            if (queue[i].coordinates==point.coordinates){
                currentIndex=i;
                break;
            }
        }

        let wayPoints;
        while (queue[currentIndex].previousIndexInQ!=-1)
        {
            wayPoints.push(queue[currentIndex]);
            currentIndex=queue[currentIndex].previousIndexInQ;
        }
        wayPoints.push(queue[currentIndex]);
        return(wayPoints);
    }

    instance(object, position) {
        this._state[position.coordinates[0]][position.coordinates[1]][position.coordinates[2]] = object;
    }

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
        var queue= new Array();
        _visitid[position.coordinates[0]][position.coordinates[1]][position.coordinates[2]]=true;
        queue.push(position);
        for (let l=0; l <queue.length; l++) {
            if (queue[l].wayLenght * 1.0 < dist * 1.0) {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let currentCoord = new Position(queue[l].coordinates[0] * 1.0 + moveSetX[i] * 1.0, queue[l].coordinates[1] * 1.0 + moveSetY[j] * 1.0, queue[l].coordinates[2] * 1.0, queue[l].wayLenght+1,l);
                        if (_visitid[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0] == false) {
                            if (this._state[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0] == null) {
                                    queue.push(currentCoord);
                            }
                            else{
                                if (this._state[currentCoord.coordinates[0] * 1.0][currentCoord.coordinates[1] * 1.0][currentCoord.coordinates[2] * 1.0]._walkable == true) {
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
        this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]]._position=to;
        this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]]._sprite.setPosition(from.coordinates[0],from.coordinates[1]);

        this._state[to.coordinates[0]][to.coordinates[1]][to.coordinates[2]] = this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]];
		this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]]=null;

    }
}

class GameObject {

    constructor(id,name,texture,walkable,visibility){
        this._id = id;
        this._name = name;
        this._sprite = texture;
        this._walkable = walkable;
		this._visibility = visibility ? visibility : 1;
    }


    draw (ctx)
    {
        this._sprite.draw(ctx);
    }
}

class floorEnvironment extends GameObject{
    constructor(id,name,texture){
        super(id,name,texture,true);
    }
}

class wallsEnvironment extends GameObject{
    constructor(id,name,texture){
        super(id,name,texture,false);
    }
}

class Entity extends  GameObject{

    constructor(position,id,name,texture,walkable,hitPoint,armor,baseDamage,
                actionPoints,speed,strength,dexterity,intelligence,perception,entiteType,attackRange)
    {
        super(position,id,name,texture,walkable);
        this._position = position;
        this._id = id;
        this._name = name;
        this._sprite = texture;
        this._hitPoint = hitPoint;
        this._armor = armor;
        this._baseDamage = baseDamage;
        this._actionPoints = actionPoints;
        this._speed = speed;
        this._strength = strength;
        this._dexterity = dexterity;
        this._intelligence = intelligence;
        this._perception = perception;
        this._entiteType = entiteType;
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
        switch(this._entiteType) {
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






