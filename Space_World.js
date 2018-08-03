"use strict";

class SpaceWorld {
    constructor() {
        this._actionType = 1;//0 - nothing , 1 - move , 2 - attack
        this._attackField = [];
        this._walkableField = [];
        this._world = null;
        this._currentCreature = null;
        this._currentTeam=0;
        this._animations=new engineAnim();
		this._curSelectedObj=null;
    }

    newAnimations()
    {
        return this._animations.getAnimArr();
    }

    genWORLD(battleType){
        let width=getRandomInt(25,50);
        let height=getRandomInt(25,50);
        let depth=3;
		let firstTeamCount;
		let secondTeamCount;
		if (battleType==0){
			 firstTeamCount=5;
			 secondTeamCount=Math.round(width*height / 150);
		}
		if (battleType==1){
			firstTeamCount=6;
			secondTeamCount=6;
		}
        this._world = new World(new GameMap(width, height, depth), firstTeamCount, secondTeamCount,battleType);

        if (this._world._battleType==0)
            for (let elem of this._world._units[0]) {
                this.setScope(true, elem,0);
            }

        if (this._world._battleType==1){
            for (let elem of this._world._units[0]) {
                this.setScope(true, elem,0);
            }
            for (let elem of this._world._units[1]) {
                this.setScope(true, elem,1);
            }
        }
    }

    nextLvl(){
        let _oldWorldSize = this.getWorldSize();
        this._world._map=new GameMap(Math.round(_oldWorldSize.width*0.2),
                                    Math.round(_oldWorldSize.height*0.2),
                                    Math.round(_oldWorldSize.depth));
        let fstTeamCoord = this._map.allAdmissibleCells(new Position(1, 1, 2, 0, -1), heroes_count, null, null);
        let scndTeamCoord = this._map.allAdmissibleCells(new Position(this._map._width - 2, this._map._height - 2, 2, 0, -1),
            monsters_count * 10, null, null);
        this._units[1] = this.spawnUnits(monsters_count, "mob", 1);
        this.placeUnits(fstTeamCoord, this._units[0]);
        this.placeUnits(scndTeamCoord, this._units[1]);
        this._world._dungeon++;
    }

    setAction(x) {
        this.deleteActionSpace();
        if (x == "attack") this._actionType = 2;
        if (x == "move") this._actionType = 1;
        this.rebuildActionSpace(null,(this._currentTeam+1)%2);
        return "action type=" + this._actionType;
    }

    getCellInfo(x, y, z) {
        let currentCell = this._world._map._cells[x][y][z];
        let visionCell = this._world._map._visionField[x][y][this._currentTeam];
        let _visibility = 0;
        if (visionCell._wasDiscovered == true) {
            _visibility = 1;
            if (visionCell._visibleLinks == 0)
                _visibility = -1;
        }

        let _type = "empty";
        let _variant = "empty";


        if (currentCell) {
            _type = currentCell._objectType;
            _variant = currentCell._variant;
        }

        return {type: _type, variant: _variant, visibility: _visibility}
    }

    getWorldSize() {
        if (this._world && this._world._map)
        return this._world._map.getMapSize();
        else return null;
    }

    doAction(x, y, mouseButton) {
        if (x < 0 || y < 0 || x >= this._world._map._width || y >= this._world._map._height) return "not on map";
        let state;
        if (mouseButton === 0) {
			let actionArea = new GameObject("area", 3, "area", true, 1);
			this._world._map._cells[this._currentCreature._position.x][this._currentCreature._position.y][1];
            state = this.SelectUnit(x, y);
			if (state=="select successfully")
				this._world._map._cells[x][y][1]=actionArea;
        }

        if (mouseButton === 2) {
            if (this._currentCreature != null && this._currentCreature._actionPoints > 0) {

                switch (this._actionType) {
                    case 0:
                        state= "nothing to do";
                        break;

                    case 1:
                        state= this.MoveUnit(x, y);
                        break;

                    case 2:
                        state= this.AttackUnit(x, y);
                        if (state=="attack successfully")
                        this._animations.pushAnim("attack",0,x,y);
                        break;
                }

            }
			if (this._currentCreature._actionPoints<1)
				this._currentCreature=null;	
        }
        else state="no hero selected";
		this._animations.pushAnim("click",0,x,y);
        return state;
    }

    MoveUnit(x, y) {
        let currentTopCell = this._world._map._cells[x][y][2];
        let currentBottomCell = this._world._map._cells[x][y][1];
        let actionPosition = new Position(x, y, 2, 0, -1);

        if ((currentTopCell == null || currentTopCell._walkable === true) && (currentBottomCell != null)
            && (currentBottomCell._objectType === "area") && (currentBottomCell._variant === 0)) {
            this.setScope(false, this._currentCreature,this._currentTeam);
            this._world._map.move(this._currentCreature._position, actionPosition);
            this._currentCreature._actionPoints--;
            this.rebuildActionSpace(null,(this._currentTeam+1)%2);
            this.setScope(true, this._currentCreature,this._currentTeam);
            return "move successfully";
        }
        else return "move unsuccessfully";
    }

    AttackUnit(x, y) {
        let currentTopCell = this._world._map._cells[x][y][2];
        let currentBottomCell = this._world._map._cells[x][y][1];

        if (currentBottomCell != null && currentTopCell != null && currentTopCell._team != this._currentTeam
            && currentBottomCell._objectType === "area" && currentBottomCell._variant === 1) {
            this._currentCreature._actionPoints--;

            let status = currentTopCell.takeDamage(this._currentCreature.calcDamage());
            if (status === "die"){ 
				this.setScope(false,this._world._map._cells[x][y][2],this._world._map._cells[x][y][2]._team);
				this._world._map._cells[x][y][2] = null;
			}
            this.rebuildActionSpace(null,(this._currentTeam+1)%2);
            return "attack successfully";
        }
        else return "attack unsuccessfully";
    }

    SelectUnit(x, y) {
        let currentTopCell = this._world._map._cells[x][y][2];
		if (currentTopCell)
			this._curSelectedObj = currentTopCell; 
        if (currentTopCell != null && currentTopCell._team === this._currentTeam) {
            this._currentCreature = currentTopCell;
            this.rebuildActionSpace(null,(this._currentTeam+1)%2);
            return "select successfully";
        }
        else {
            this._currentCreature = null;
            this.rebuildActionSpace(null,(this._currentTeam+1)%2);
            return "select unsuccessfully";
        }
    }

    cutOffInvisible(curArr,fstPos){
        for (let i= curArr.length-1;i>-1;i--){
            let secPos=curArr[i];
            let A=fstPos.y-secPos.y;
            let B=secPos.x-fstPos.x;
            let C=fstPos.x*secPos.y-secPos.x*fstPos.y;
            if (B!=0){
                for (let X=Math.min(fstPos.x,secPos.x); X<=Math.max(fstPos.x,secPos.x);X=X+0.001){
                    let y=Math.round((-C-A*X) / B*1.0);
                    let x=Math.round(X);
                    if (y<1 && y>this._world._map._height-2
                        &&x<1 && x>this._world._map.width-2) continue;
                    if ((x==fstPos.x && y==fstPos.y) || (x==secPos.x && y==secPos.y)) continue;
                    if (this._world._map._cells[x][y][2]){
                        curArr.splice(i,1);
                        break;
                    }
                }
            }
            else{
                let x=fstPos.x;
                for (let y=Math.min(fstPos.y,secPos.y); y<=Math.max(fstPos.y,secPos.y);y++){
                    if (y<1 && y>this._world._map._height-2
                        &&x<1 && x>this._world._map.width-2) continue;
                    if ((x==fstPos.x && y==fstPos.y) || (x==secPos.x && y==secPos.y)) continue;
                    if (this._world._map._cells[x][y][2]){
                        curArr.splice(i,1);
                        break;
                    }
                }
            }
        }
    }
	
    calcActionSpaces(ignorType,ignorTeam) {
        if (this._currentCreature != null && this._currentCreature._actionPoints>0) {
            this._walkableField = this._world._map.allAdmissibleCells(this._currentCreature._position,
                this._currentCreature._speed,null,null);
            this._attackField = this._world._map.allAdmissibleCells(this._currentCreature._position,
                this._currentCreature._attackRange, ignorType,ignorTeam);
            this.cutOffInvisible(this._attackField,this._currentCreature._position);
            this._walkableField.splice(0, 1);
            this._attackField.splice(0, 1);
        }
        else {
            this._walkableField = null;
            this._attackField = null;
        }
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

    rebuildActionSpace(ignorType,ignorTeam) {
        this.deleteActionSpace();
        this.calcActionSpaces(ignorType,ignorTeam);
        this.makeActionSpace();
    }

    setScope(flag, currentCreature,index) {
        let map = this._world._map;
        for (let x = Math.max(0, currentCreature._position.x - currentCreature._rangeVision);
             x <= Math.min(map._width - 1, currentCreature._position.x + currentCreature._rangeVision); x++)
            for (let y = Math.max(0, currentCreature._position.y - currentCreature._rangeVision);
                 y <= Math.min(map._height - 1, currentCreature._position.y + currentCreature._rangeVision); y++)
                if (this._world._map._visionField[x][y])
                    if (flag) {
                        this._world._map._visionField[x][y][index]._wasDiscovered = true;
                        this._world._map._visionField[x][y][index]._visibleLinks++;
                    }
                    else
                        this._world._map._visionField[x][y][index]._visibleLinks--;

    }

    tryAttackHero() {
        this._actionType = 2;
        let attackFields = this.getCurrentAreaArray();
        this.cutOffInvisible(attackFields,this._currentCreature._position);
        for (let elem of attackFields) {
            let currentCell = this._world._map._cells[elem.x][elem.y][elem.z];
            if (currentCell && currentCell._team != this._currentTeam && this._currentCreature._actionPoints > 0) {
                let status = currentCell.takeDamage(this._currentCreature.calcDamage());
                this._animations.pushAnim("attack",0,currentCell._position.x,currentCell._position.y);
                if (status === "die") {
					this.setScope(false,this._world._map._cells[currentCell._position.x][currentCell._position.y][2],currentCell._team);
                    this._world._map._cells[currentCell._position.x][currentCell._position.y][2] = null;
                }
            }
            if (this._currentCreature._actionPoints <= 0) break;
        }
    }

    tryMoveMob() {
        this._actionType = 1;
        let moveFields = this.getCurrentAreaArray();
        let randomIndex = getRandomInt(0, moveFields.length);
        let point = new Position(moveFields[randomIndex].x, moveFields[randomIndex].y, 2,0,-1);
        this._world._map.move(this._currentCreature._position, point);
        this._currentCreature._actionPoints--;
    }

    updateCreatureStatus(currentArray) {
        for (let i = currentArray.length - 1; i > -1; i--) {
            if (currentArray[i]._hitPoint <= 0) currentArray.splice(i, 1);
            else currentArray[i]._actionPoints = 2;
        }
    }

    nextRound() {
        let lastAction=this._actionType;
        this.deleteActionSpace();
        this._currentCreature = null;

        for (let i=0;i<this._world._units.length;i++) {
            this.updateCreatureStatus(this._world._units[i]);
        }

        this._currentTeam=(this._currentTeam+1) % 2;

        if (this._world._battleType==0){
            for (this._currentCreature of this._world._units[1]) {
                this.calcActionSpaces(null,(this._currentTeam+1)%2);
                if (this._currentCreature._actionPoints > 0)
                    this.tryAttackHero();
                if (this._currentCreature._actionPoints > 0)
                    this.tryMoveMob();
            }

            this._currentCreature = null;
            this._actionType=lastAction;
            this.rebuildActionSpace(null,(this._currentTeam+1)%2);

            for (let i=0;i<this._world._units.length;i++) {
                this.updateCreatureStatus(this._world._units[i]);
            }
            for (let elem of this._world._spawners){
                let curField=this._world._map.allAdmissibleCells(elem._position,10,null,null);
				curField[0]=curField[1];
                let curCell=curField[getRandomInt(0,100) % curField.length];
				if (curCell){
					let unit=elem.spawnUnit(curCell.x,curCell.y,curCell.z);
					this._world._units[1].push(unit);
					this._world._map._cells[unit._position.x][unit._position.y][unit._position.z]=unit;
				}
            }
            this._currentTeam=(this._currentTeam+1) % 2;
        }



        if (this._world._units[0].length == 0) return "0 team lost";
        if (this._world._units[1].length == 0) return "1 team win";
    }

    useMagic(game){
        if (this._currentCreature && this._currentCreature._mannaPoints>0){
            this._currentCreature._spell(game);
        }
    }

    getCurSelectedObjInf(){
		let infArr=[];
		if (this._curSelectedObj)
		for (elem of this._curSelectedObj){
			if (typeof(elem) != "function"){
				infArr.push(String(elem));
			}
		}	
	}
	
	exitWorld(){
		this._actionType = 1;//0 - nothing , 1 - move , 2 - attack
        this._attackField = [];
        this._walkableField = [];
        this._world = null;
        this._currentCreature = null;
        this._currentTeam=0;
        this._animations=new engineAnim();
		this._curSelectedObj=null;
	}
}

