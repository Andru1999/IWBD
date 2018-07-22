"use strict"
function LoadBaseResurses(func)
{
    var TexturesArr = {};
    var BaseSpritesArr = {};
    var ImgArr = {};
    var BaseCellSize= new Size(BaseCellHeight,BaseCellWidth);
    LoadImg(
        [
            'Assets/BlueWallAndFloor.png',
            'Assets/GreyWallAndFloor.png',
            'Assets/WhiteWallAndFloor.png',
            "Assets/Void.png",
            "Assets/Hero.png",
            "Assets/AttakSpase.png",
            "Assets/Smoke.png",
            "Assets/WalkableSpase.png"
        ], func);

    function LoadImg(urlArr, func) {
        let SothigToFixAJAX = urlArr.length;
        function _load(url) {

            let img = new Image();
            img.onload = function () {
                SothigToFixAJAX--;
                if (SothigToFixAJAX == 0) 
                {
                    genTextures(func);
                }
            };
            img.src = url;
            return img;
        }

        urlArr.forEach(function (url) {
            ImgArr[url] = _load(url);
        });
    }


    function genTextures(func)
    {
        function AddBaseTexture(img, dx, dy, name) {
            TexturesArr[name] = new Texture(img, dx, dy);
        }

        AddBaseTexture(ImgArr['Assets/BlueWallAndFloor.png'], 64, 64, "BlueWalls&Floor");
        AddBaseTexture(ImgArr['Assets/GreyWallAndFloor.png'], 64, 64, "GreyWalls&Floor");
        AddBaseTexture(ImgArr['Assets/WhiteWallAndFloor.png'], 64, 64, "WhiteWalls&Floor");
        AddBaseTexture(ImgArr['Assets/Void.png'], 64, 64, "VoidTexture");
        AddBaseTexture(ImgArr['Assets/Smoke.png'], 64, 64, "Smoke");
        AddBaseTexture(ImgArr['Assets/WalkableSpase.png'], 64, 64, "WalkableSpase");
        AddBaseTexture(ImgArr['Assets/AttakSpase.png'], 64, 64, "AttakSpase");
        AddBaseTexture(ImgArr['Assets/Hero.png'], 16, 21, "Hero");
        genBaseSprites(func);
    }

    function genBaseSprites(func)
    {
        function AddBaseSkin(name, basetexture, size, index) {
            if (BaseSpritesArr[name] == undefined) {
                BaseSpritesArr[name] = [];
            }
            BaseSpritesArr[name].push(new BaseSprite(TexturesArr[basetexture], size, index));
        }

        AddBaseSkin("wall", "BlueWalls&Floor", BaseCellSize, 0);
        AddBaseSkin("floor", "BlueWalls&Floor", BaseCellSize, 1);
        AddBaseSkin("wall", "GreyWalls&Floor", BaseCellSize, 0);
        AddBaseSkin("floor", "GreyWalls&Floor", BaseCellSize, 1);
        AddBaseSkin("wall", "WhiteWalls&Floor", BaseCellSize, 0);
        AddBaseSkin("floor", "WhiteWalls&Floor", BaseCellSize, 1);
        AddBaseSkin("void", "VoidTexture", BaseCellSize, 0);
        AddBaseSkin("hero", "Hero", BaseCellSize, 0);
        AddBaseSkin("areas", "WalkableSpase", BaseCellSize, 0);
        AddBaseSkin("areas", "AttakSpase", BaseCellSize, 0);
        AddBaseSkin("smoke", "Smoke", BaseCellSize, 0);
        func(BaseSpritesArr);
    }

}

