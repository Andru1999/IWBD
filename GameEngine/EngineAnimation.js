class engineAnim{
    constructor(){
        this.animArr=[];
    }
    pushAnim(type,variant,x,y)
    {
        this.animArr.push({type:type,variant:variant,x:x,y:y});
    }

    getAnimArr()
    {
        let buff=this.animArr;
        this.animArr = [];
        return buff;
    }
}

