"use strict";

class SpaceWorld {
    constructor() {
        this._actionType = 1;//0 - nothing , 1 - move , 2 - attack
        this._attackField = [];
        this._walkableField = [];
        this._world = new World(new GameMap(25, 25, 3), 2, 0);
        this._currentCreature = null;
    }

    setAction(x) {
        this.deleteActionSpace();
		if (x=="attack") this._actionType = 2;
		if (x=="move") this._actionType = 1;
        this.makeActionSpace();
		return "action type="+this._actionType;
    }

    getCellInfo(x, y, z) {
		let currentCell = this._world._map._cells[x][y][z];
		if (currentCell)
			return {type:currentCell._objectType , 
					variant:currentCell._variant, 
					visibility:currentCell._visibility};
		else return "empty";			
    }
	
	getWorldSize (){
		return this._world._map.getMapSize();
	}
	
    doAction(x, y, mouseButton) {
		if (x<0 || y<0 || x>this._world._map._width || y>this._world._map._height) return "not in map";
		
		if (mouseButton === 0) {
           return this.SelectUnit(x,y); 
        }
		
		if (mouseButton === 2) {
			if (this._currentCreature != null && this._currentCreature._actionPoints > 0) {
            
                switch (this._actionType) {
                    case 0:
                        return "nothing";
                        break;

                    case 1:
						return this.MoveUnit(x,y);
                        break;

                    case 2:
						return this.AttackUnit(x,y);
                        break;
                }
            }
        }
		else return "no hero selected";
    }
	
	MoveUnit(x,y){
		let currentTopCell = this._world._map._cells[x][y][2];
        let currentBottomCell = this._world._map._cells[x][y][1];
        let actionPosition = new Position(x, y, 2, 0, -1);
		
		if ((currentTopCell == null || currentTopCell._walkable === true) && (currentBottomCell!= null)
			&& (currentBottomCell._objectType === "area") && (currentBottomCell._variant === 0)) {
            this._world._map.move(this._currentCreature._position, actionPosition);
            this._currentCreature._actionPoints--;
            this.deleteActionSpace();
            this.calcActionSpaces();
            this.makeActionSpace();
            return "move successfully";
        }
        else return "move unsuccessfully";
	}
	
	AttackUnit(x,y){
		let currentTopCell = this._world._map._cells[x][y][2];
        let currentBottomCell = this._world._map._cells[x][y][1];
       		
		if (currentBottomCell!=null && currentTopCell != null && currentTopCell._objectType === "mob"
            && currentBottomCell._objectType === "area" && currentBottomCell._variant === 1) {
            this._currentCreature._actionPoints--;
            currentTopCell.takeDamage(this._currentCreature.calcDamage());
            this.deleteActionSpace();
            this.calcActionSpaces();
            this.makeActionSpace();
            return "attack successfully";
        }
        else return "attack unsuccessfully";
	}
	
	SelectUnit(x,y){
		let currentTopCell = this._world._map._cells[x][y][2];
        		
		if (currentTopCell != null && currentTopCell._objectType === "hero") {
                this._currentCreature = currentTopCell;
				this.deleteActionSpace();
                this.calcActionSpaces();
                this.makeActionSpace();
				return "select successfully";
            }
			else {
				this.deleteActionSpace();
				this._currentCreature=null;
				return "select successfully";
			}
	}

    calcActionSpaces() {
        this._walkableField = this._world._map.allAdmissibleCells(this._currentCreature._position, this._currentCreature._speed);
        this._attackField = this._world._map.allAdmissibleCells(this._currentCreature._position, this._currentCreature._attackRange);
    }

    getCurrentAreaArray() {
        switch (this._actionType) {
			case 0:
				return null;
			break;
            case 1:
                return this._walkableField;
            break;
            case 2:
                return this._attackField;
            break;
        }
    }

    makeActionSpace() {
        let actionArea = new GameObject("area", this._actionType - 1, "area", true, 1);
        let currentArray = this.getCurrentAreaArray();
		if (currentArray)
			for (let i = 0; i < currentArray.length; i++) {
				let currentPos = currentArray[i];
				this._world._map._cells[currentPos.x][currentPos.y][1] = actionArea;
			}
    }

    deleteActionSpace() {
        let currentArray = this.getCurrentAreaArray();
		if (currentArray)
			for (let i = 0; i < currentArray.length; i++) {
				let currentPos = currentArray[i];
				this._world._map._cells[currentPos.x][currentPos.y][1] = null;
			}
    }
}
var tpp = new SpaceWorld();