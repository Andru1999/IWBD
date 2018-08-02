"use strict";

function LoadBaseResurses(func) {
    var TexturesArr = {};
    var BaseSpritesArr = {};
    var ImgArr = {};
    var BaseCellSize = new Size(BaseCellHeight, BaseCellWidth);
    LoadImg(
        [
            'Assets/BlueWallAndFloor.png',
            'Assets/GreyWallAndFloor.png',
            'Assets/WhiteWallAndFloor.png',
            "Assets/Void.png",
            "Assets/Hero.png",
            "Assets/AttackSpace.png",
            "Assets/Smoke.png",
            "Assets/WalkableSpace.png",
            "Assets/ExitButton.png",
            "Assets/StartButton.png",
            "Assets/OptionButton.png",
            "Assets/BackButton.png",
            "Assets/AttackMoveButton.png",
            "Assets/MagicButton.png",
            "Assets/NextButton.png",
            "Assets/mobs.png",
            "Assets/dmgsprite.png",
            "Assets/heal.png",
            "Assets/boost.png",
            "Assets/hurricane.png",
            "Assets/Corruption.png"
            ],func);

    function LoadImg(urlArr, func) {
        let SothigToFixAJAX = urlArr.length;

        function _load(url) {

            let img = new Image();
            img.onload = function () {
                SothigToFixAJAX--;
                if (SothigToFixAJAX == 0) {
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


    function genTextures(func) {
        function AddBaseTexture(img, dx, dy, name) {
            TexturesArr[name] = new Texture(img, dx, dy);
        }

        AddBaseTexture(ImgArr['Assets/BlueWallAndFloor.png'], 64, 64, "BlueWalls&Floor");
        AddBaseTexture(ImgArr['Assets/GreyWallAndFloor.png'], 64, 64, "GreyWalls&Floor");
        AddBaseTexture(ImgArr['Assets/WhiteWallAndFloor.png'], 64, 64, "WhiteWalls&Floor");
        AddBaseTexture(ImgArr['Assets/Void.png'], 64, 64, "VoidTexture");
        AddBaseTexture(ImgArr['Assets/Smoke.png'], 64, 64, "Smoke");
        AddBaseTexture(ImgArr['Assets/WalkableSpace.png'], 64, 64, "WalkableSpase");
        AddBaseTexture(ImgArr['Assets/AttackSpace.png'], 64, 64, "AttakSpase");
        AddBaseTexture(ImgArr["Assets/mobs.png"], 16, 16, "Mobs");
        AddBaseTexture(ImgArr['Assets/Hero.png'], 16, 21, "Hero");
        AddBaseTexture(ImgArr["Assets/ExitButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "ExitButton");
        AddBaseTexture(ImgArr["Assets/StartButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "StartButton");
        AddBaseTexture(ImgArr["Assets/BackButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "BacktButton");
        AddBaseTexture(ImgArr["Assets/OptionButton.png"], ImgArr["Assets/OptionButton.png"].width, ImgArr["Assets/OptionButton.png"].height, "OptionButton");
        AddBaseTexture(ImgArr["Assets/AttackMoveButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "AttackMoveButton");
        AddBaseTexture(ImgArr["Assets/NextButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "NextButton");
        AddBaseTexture(ImgArr["Assets/MagicButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "MagicButton");
        AddBaseTexture(ImgArr["Assets/dmgsprite.png"], 39, 39, "DmgTexture");
        AddBaseTexture(ImgArr["Assets/heal.png"], 39, 39, "HealTexture");
        AddBaseTexture(ImgArr["Assets/boost.png"], 39, 39, "BoostTexture");
        AddBaseTexture(ImgArr["Assets/hurricane.png"], 39, 39, "HurTexture");
        AddBaseTexture(ImgArr["Assets/Corruption.png"], 39, 39, "Corruption");
        genBaseSprites(func);
    }

    function genBaseSprites(func) {
        function AddBaseSkin(name, basetexture, size, framesArr) {
            if (BaseSpritesArr[name] == undefined) {
                BaseSpritesArr[name] = [];
            }
            BaseSpritesArr[name].push(new BaseSprite(TexturesArr[basetexture], size, framesArr));
        }

        AddBaseSkin("wall", "BlueWalls&Floor", BaseCellSize, [0]);
        AddBaseSkin("floor", "BlueWalls&Floor", BaseCellSize, [1]);
        AddBaseSkin("wall", "GreyWalls&Floor", BaseCellSize, [0]);
        AddBaseSkin("floor", "GreyWalls&Floor", BaseCellSize, [1]);
        AddBaseSkin("wall", "WhiteWalls&Floor", BaseCellSize, [0]);
        AddBaseSkin("floor", "WhiteWalls&Floor", BaseCellSize, [1]);
        AddBaseSkin("void", "VoidTexture", BaseCellSize, [0]);
        AddBaseSkin("hero", "Hero", BaseCellSize, [0]);
        AddBaseSkin("hero", "Hero", BaseCellSize, [1]);
        AddBaseSkin("hero", "Hero", BaseCellSize, [2]);
        AddBaseSkin("hero", "Hero", BaseCellSize, [3]);
        AddBaseSkin("area", "WalkableSpase", BaseCellSize, [0]);
        AddBaseSkin("area", "AttakSpase", BaseCellSize, [0]);
        AddBaseSkin("smoke", "Smoke", BaseCellSize, [0]);
        AddBaseSkin("mob", "Mobs", BaseCellSize, [0]);
        AddBaseSkin("mob", "Mobs", BaseCellSize, [1]);
        AddBaseSkin("spawner", "Corruption", BaseCellSize, [0]);
        AddBaseSkin("buttons", "StartButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), [0,1]);         //0
        AddBaseSkin("buttons", "ExitButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), [0]);            //1
        AddBaseSkin("buttons", "BacktButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), [0]);           //2
        AddBaseSkin("buttons", "AttackMoveButton", new Size(ImgArr["Assets/ExitButton.png"].width / 8, ImgArr["Assets/ExitButton.png"].height / 8), [0,1]);    //3
        AddBaseSkin("buttons", "OptionButton", new Size(ImgArr["Assets/OptionButton.png"].width / 8, ImgArr["Assets/OptionButton.png"].height / 8), [0]);      //4
        AddBaseSkin("buttons", "NextButton", new Size(ImgArr["Assets/ExitButton.png"].width / 8, ImgArr["Assets/ExitButton.png"].height / 8), [0]);            //5
        AddBaseSkin("buttons", "MagicButton", new Size(ImgArr["Assets/ExitButton.png"].width / 8, ImgArr["Assets/ExitButton.png"].height / 8), [0]);           //6
        AddBaseSkin("attack", "DmgTexture", BaseCellSize, [0,1,2,3,4,5,6,7,8,9,10,11,12]);
        AddBaseSkin("heal", "HealTexture", BaseCellSize, [0,1,2,3,4,5,6,7,8,9,10,11,12]);
        AddBaseSkin("boost", "BoostTexture", BaseCellSize, [0,1,2,3,4,5,6,7,8,9,10,11,12]);
        AddBaseSkin("hurricane", "HurTexture", BaseCellSize, [0,1,2,3,4,5,6,7,8,9,10,11,12]);
        func(BaseSpritesArr);
    }

}

