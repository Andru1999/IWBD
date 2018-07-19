(function preLoad()
{
    LoadResources([
        'Assets/BlueWallAndFloor.png',
        'Assets/GreyWallAndFloor.png',
        'Assets/WhiteWallAndFloor.png',
        "Assets/Void.png",
        "Assets/Hero.png"
    ]);
})();


function AddBaseTexture(url,dx,dy,name)
{
    BaseTextures[name]=new Texture(url, dx, dy);
}

function AddBaseSkin(name, basetexture, size, index)
{
    BaseSprites[name]=new BaseSprite(BaseTextures[basetexture], size, index);
    return BaseSprites[name];
}


readyCallbacks.push(MakeTextures);
readyCallbacks.push(Start);




baseSize=new Size(BaseCellSize,BaseCellSize);

function MakeTextures()
{
    AddBaseTexture('Assets/BlueWallAndFloor.png',64,64,"BlueWalls&Floor");
    AddBaseTexture('Assets/GreyWallAndFloor.png',64,64,"GreyWalls&Floor");
    AddBaseTexture('Assets/WhiteWallAndFloor.png',64,64,"WhiteWalls&Floor");
    AddBaseTexture('Assets/Void.png',64,64,"VoidTexture");
    AddBaseTexture('Assets/Hero.png',16,21,"Heroes");

    //////////////////////////////////////////////////////////// Все базовые задаются скины после этой строчки
    WallsArray.push(AddBaseSkin("BlueWall" ,"BlueWalls&Floor",baseSize,0));
    FloorsArray.push(AddBaseSkin("BlueFloor" ,"BlueWalls&Floor",baseSize,1));
    WallsArray.push(AddBaseSkin("GreyWall" ,"GreyWalls&Floor",baseSize,0));
    FloorsArray.push(AddBaseSkin("GreyFloor" ,"GreyWalls&Floor",baseSize,1));
    WallsArray.push(AddBaseSkin("WhiteWall" ,"WhiteWalls&Floor",baseSize,0));
    FloorsArray.push(AddBaseSkin("WhiteFloor" ,"WhiteWalls&Floor",baseSize,1));
    AddBaseSkin("Void" ,"VoidTexture",baseSize,0);
    HeroesTextureArray.push(AddBaseSkin("HeroWarior" ,"Heroes",baseSize,0))
}

getBaseSprite = function(name){return BaseSprites[name];};


