var BaseSprites={};
var BaseTextures={};

function AddBaseTexture(url,dx,dy,name)
{
    BaseTextures[name]=new Texture(url, dx, dy);
}

function AddBaseSkin(name, basetexture, size, index)
{
    BaseSprites[name]=new BaseSprite(BaseTextures[basetexture], size, index);
}


resources.onReady(MakeTextures)
resources.onReady(init);


(function preLoad()
{
    resources.load([
        'Assets/WallAndFloor.png'
    ]);
})();

var baseSize=new Size(32,32);
function MakeTextures()
{
    AddBaseTexture('Assets/WallAndFloor.png',64,64,"Walls&Floor");







    //////////////////////////////////////////////////////////// Все базовые скины после этой строчки
    AddBaseSkin("HorWall" ,"Walls&Floor",baseSize,1);
    AddBaseSkin("Conner" ,"Walls&Floor",baseSize,0);
    AddBaseSkin("VertWall" ,"Walls&Floor",baseSize, 3);
    AddBaseSkin("Floor" ,"Walls&Floor",baseSize, 2);
}

function getBaseSprite(name)
{
    return BaseSprites[name];
}


