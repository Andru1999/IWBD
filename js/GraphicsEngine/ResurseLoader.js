class ResuseLoader
{
    constructor(func) {
        this.TexturesArr = {};
        this.BaseSpritesArr = {};

        function LoadImg(urlArr,func,obj) {
            var SothigToFixAJAX=urlArr.length;
            var resourceCache={};
            var _obj= obj;
            var _func= func;
            function _load(url) {

                var img = new Image();
                img.onload = function()
                {
                    SothigToFixAJAX--;
                    if (SothigToFixAJAX==0)
                    {
                        _obj.genTextures(_func);
                    }
                };
                img.src = url;
                return img;
            }

            urlArr.forEach(function(url){
                resourceCache[url] = _load(url);
            });

            return resourceCache;
        }

        this.ImgArr=LoadImg(
            [
                'Assets/BlueWallAndFloor.png',
                'Assets/GreyWallAndFloor.png',
                'Assets/WhiteWallAndFloor.png',
                "Assets/Void.png",
                "Assets/Hero.png",
                "Assets/AttakSpase.png",
                "Assets/Smoke.png",
                "Assets/WalkableSpase.png"
            ],func,this
        );

    }
    genTextures(func)
    {
        function AddBaseTexture(img,dx,dy,name,obj)
        {
            obj.TexturesArr[name]=new Texture(img, dx, dy);
        }
        AddBaseTexture(this.ImgArr['Assets/BlueWallAndFloor.png'],64,64,"BlueWalls&Floor",this);
        AddBaseTexture(this.ImgArr['Assets/GreyWallAndFloor.png'],64,64,"GreyWalls&Floor",this);
        AddBaseTexture(this.ImgArr['Assets/WhiteWallAndFloor.png'],64,64,"WhiteWalls&Floor",this);
        AddBaseTexture(this.ImgArr['Assets/Void.png'],64,64,"VoidTexture",this);
        AddBaseTexture(this.ImgArr['Assets/Smoke.png'],64,64,"Smoke",this);
        AddBaseTexture(this.ImgArr['Assets/WalkableSpase.png'],64,64,"WalkableSpase",this);
        AddBaseTexture(this.ImgArr['Assets/AttakSpase.png'],64,64,"AttakSpase",this);
        AddBaseTexture(this.ImgArr['Assets/Hero.png'],16,21,"Hero",this);
        this.genBaseSprites(func);
    }

    genBaseSprites(func)
    {
        function AddBaseSkin(name, basetexture, size, index,obj)
        {
            if (obj.BaseSpritesArr[name]==undefined)
            {
                obj.BaseSpritesArr[name]=[];
            }
            obj.BaseSpritesArr[name].push(new BaseSprite(obj.TexturesArr[basetexture], size, index));
        }

        AddBaseSkin("wall" ,"BlueWalls&Floor",BaseCellSize,0,this);
        AddBaseSkin("floor" ,"BlueWalls&Floor",BaseCellSize,1,this);
        AddBaseSkin("wall" ,"GreyWalls&Floor",BaseCellSize,0,this);
        AddBaseSkin("floor" ,"GreyWalls&Floor",BaseCellSize,1,this);
        AddBaseSkin("wall" ,"WhiteWalls&Floor",BaseCellSize,0,this);
        AddBaseSkin("floor" ,"WhiteWalls&Floor",BaseCellSize,1,this);
        AddBaseSkin("void" ,"VoidTexture",BaseCellSize,0,this);
        AddBaseSkin("hero" ,"Hero",BaseCellSize,0,this);
        AddBaseSkin("areas" ,"WalkableSpase",BaseCellSize,0,this);
        AddBaseSkin("areas" ,"AttakSpase",BaseCellSize,0,this);
        AddBaseSkin("smoke" ,"Smoke",BaseCellSize,0,this);
        func();
    }

}