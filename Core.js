"use strict"
// JavaScript source code
function getRandomInt(min, max)
{
    var x=0;
    x=(Math.floor(Math.random() * (max - min ))*1.0 + min*1.0);
    return x;
}

class Position {
    constructor(x,y,z){
        this.coordinates=new Array(3);
        this.coordinates[0]=x;
        this.coordinates[1]=y;
        this.coordinates[2]=z;
    }
}

class Map {


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
       for (let i=0;i<this._state.length;i++){
           for (let j=0;j<this._state[i].length;j++){
               this._state[i][j][0]=new floorEnvironment (0,"floor",new Sprite(FloorsArray[0],new PositionOnCanvas(i*32,j*32)));
           }
       }
	   
	   
	   for (let i=0;i<this._width;i++){
           this._state[i][0][1]=new wallsEnvironment (0,"wall",new Sprite(WallsArray[0],new PositionOnCanvas(i*32,0)));
       }
	   for (let i=0;i<this._width;i++){
           this._state[i][(this._height-1)][1]=new wallsEnvironment (0,"wall",new Sprite(WallsArray[0],new PositionOnCanvas(i*32,(this._height-1)*32)));
       }
	   for (let i=0;i<this._height;i++){
           this._state[0][i][1]=new wallsEnvironment (0,"wall",new Sprite(WallsArray[0],new PositionOnCanvas(0,i*32)));
       }
	   for (let i=0;i<this._state.length;i++){
           this._state[this._width-1][i][1]=new wallsEnvironment (0,"wall",new Sprite(WallsArray[0],new PositionOnCanvas((this._width-1)*32,i*32)));
       }
	   
	   for (let i=0;i<1;i++){
		   let randomPosition=new Position(getRandomInt(7,7),getRandomInt(7,7),1);
		   let _wall=this.allAdmissibleCells(randomPosition,8);
		   for (let i=0;i<_wall.length;i++){
				   this._state[_wall[i].coordinates[0]][_wall[i].coordinates[1]][_wall[i].coordinates[2]]  =new wallsEnvironment (0,"wall",new Sprite(WallsArray[2],new PositionOnCanvas(_wall[i].coordinates[0]*32,_wall[i].coordinates[1]*32)));
				}	
			
	   }
    }

    findWay(first, second) {

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
        let l = 0;
        let r = 0;
        queue.push(position);
        let wayLength=0;
		let count = 0;
		_visitid[position.coordinates[0]][position.coordinates[1]][position.coordinates[2]]=true;
        while (l <= r) {
            for (let k = l; k <= r; k++) { 
				if (wayLength*1.0 < dist*1.0){
					for (let i = 0; i < 3; i++) {
						for (let j = 0; j < 3; j++) {
							let currentCoord = new Position(queue[k].coordinates[0]*1.0 + moveSetX[i]*1.0,queue[k].coordinates[1]*1.0 + moveSetY[j]*1.0, queue[k].coordinates[2]*1.0);
							if (_visitid[currentCoord.coordinates[0]*1.0][currentCoord.coordinates[1]*1.0][currentCoord.coordinates[2]*1.0] == false){
								if (this._state[currentCoord.coordinates[0]*1.0][currentCoord.coordinates[1]*1.0][currentCoord.coordinates[2]*1.0] == null){
									queue.push(currentCoord);
									count++;
								}
								else{
									if (this._state[currentCoord.coordinates[0]*1.0][currentCoord.coordinates[1]*1.0][currentCoord.coordinates[2]*1.0]._walkable==true){
										queue.push(currentCoord);
										count++;
									}
								}
								_visitid[currentCoord.coordinates[0]*1.0][currentCoord.coordinates[1]*1.0][currentCoord.coordinates[2]*1.0] =true;
							}
						}
					}
				}
			}
            l=r+1;
            r=r+count;
            count=0;
            wayLength++;
        }
        return queue;
    }
    move (from,to){
        let buff;
        buff=this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]];
        this._state[from.coordinates[0]][from.coordinates[1]][from.coordinates[2]]=null;
        this._state[to.coordinates[0]][to.coordinates[1]][to.coordinates[2]]=buff;
    }
}

class GameObject {


    constructor(id,name,texture,walkable){
        this._id = id;
        this._name = name;
        this._sprite = texture;
        this._walkable = walkable;
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
                actionPoints,speed,strength,dexterity,intelligence,perception,entiteType)
    {
        super(position,id,name,texture,walkable);
        this._position = position;
        this._id = id;
        this._name = name;
        this._texture = texture;
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
    }

    takeDamage (damage){
        if (this._dexterity<getRandomInt(0,100)){
            this._hitPoint=this._hitPoint-damage*this._armor/100;
        }
        else{
            //мы уклонились
        }
    }

    calcDamage (){
        switch(this._entiteType) {
            case 'strongman':
                return this._strength*this._baseDamage;
                break;

            case 'trickster':
                return this._dexterity*this._baseDamage;
                break;

            case 'wizard':
                return this._intelligence*this._baseDamage;
                break;

            default:
                return this._baseDamage;
                break;
        }
    }
}






