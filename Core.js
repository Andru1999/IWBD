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
        this.coordinates==new Array(3);
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
               this._state[i][j][0]=new floorEnvironment (0,"floor",new Sprite(FloorsArray[2],new PositionOnCanvas(i*32,j*32)))
           }
       }
	   for (let i=0;i<this._state.length;i++){
           
       }
	   for (let i=0;i<this._state.length;i++){
           
       }
	   for (let i=0;i<this._state.length;i++){
           
       }
	   for (let i=0;i<this._state.length;i++){
           
       }
    }

    findWay(first, second) {

    }

    instance(object, position) {
        this._state[position.coordinates[0]][position.coordinates[1]][position.coordinates[2]] = object;
    }

    allAdmissibleCells(position, dist) {
        let moveSetX = [-1, 0, 1];
        let moveSetY = [-1, 0, 1];
        var queue= new Array();
        let l = 0;
        let r = 0;
        queue.push(position);
        let wayLength=0;
        while (l <= r) {
            for (let k = l; k <= r; k++) {
                var count = 0;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (wayLength*1.0 <= dist*1.0){
                            if (this._state[queue[k].coordinates[0]*1.0 + moveSetX[i]*1.0][queue.coordinates[1]*1.0 + moveSetY[j]*1.0][queue.coordinates[2]*1.0] == null){
                                let currentCoord = new Position(queue.coordinates[0]*1.0 + moveSetX[i]*1.0,queue.coordinates[1]*1.0 + moveSetY[j]*1.0, queue.coordinates[2]*1.0);
                                queue.push(currentCoord);
                                count++;
                            }
                            else{
                                if (this._state[queue.coordinates[0]*1.0 + moveSetX[i]*1.0][queue.coordinates[1]*1.0 + moveSetY[j]*1.0][queue.coordinates[2]*1.0].walkable()==true){
                                    let currentCoord = new Position(queue.coordinates[0]*1.0 + moveSetX[i]*1.0,queue.coordinates[1]*1.0 + moveSetY[j]*1.0, queue.coordinates[2]*1.0);
                                    queue.push(currentCoord);
                                    count++;
                                }
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
        this.sprite = texture;
        this._walkable = walkable;
    }


    draw (ctx)
    {
        this.sprite.draw(ctx);
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
        this._walkable = walkable;
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






