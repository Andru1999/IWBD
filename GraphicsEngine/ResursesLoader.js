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
            "Assets/AttakSpase.png",
            "Assets/Smoke.png",
            "Assets/WalkableSpase.png",
            "Assets/ExitButton.png",
            "Assets/StartButton.png",
            "Assets/OptionButton.png",
            "Assets/BackButton.png",
            "Assets/AttackMoveButton.png",
            "Assets/MagicButton.png",
            "Assets/NextButton.png",
            "Assets/mobs.png"
        ], func);

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
        AddBaseTexture(ImgArr['Assets/WalkableSpase.png'], 64, 64, "WalkableSpase");
        AddBaseTexture(ImgArr['Assets/AttakSpase.png'], 64, 64, "AttakSpase");
        AddBaseTexture(ImgArr["Assets/mobs.png"], 16, 16, "Mobs");
        AddBaseTexture(ImgArr['Assets/Hero.png'], 16, 21, "Hero");
        AddBaseTexture(ImgArr["Assets/ExitButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "ExitButton");
        AddBaseTexture(ImgArr["Assets/StartButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "StartButton");
        AddBaseTexture(ImgArr["Assets/BackButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "BacktButton");
        AddBaseTexture(ImgArr["Assets/OptionButton.png"], ImgArr["Assets/OptionButton.png"].width, ImgArr["Assets/OptionButton.png"].height, "OptionButton");
        AddBaseTexture(ImgArr["Assets/AttackMoveButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "AttackMoveButton");
        AddBaseTexture(ImgArr["Assets/NextButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "NextButton");
        AddBaseTexture(ImgArr["Assets/MagicButton.png"], ImgArr["Assets/ExitButton.png"].width, ImgArr["Assets/ExitButton.png"].height, "MagicButton");
        genBaseSprites(func);
    }

    function genBaseSprites(func) {
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
        AddBaseSkin("hero", "Hero", BaseCellSize, 1);
        AddBaseSkin("hero", "Hero", BaseCellSize, 2);
        AddBaseSkin("hero", "Hero", BaseCellSize, 3);
        AddBaseSkin("area", "WalkableSpase", BaseCellSize, 0);
        AddBaseSkin("area", "AttakSpase", BaseCellSize, 0);
        AddBaseSkin("smoke", "Smoke", BaseCellSize, 0);
        AddBaseSkin("mob", "Mobs", BaseCellSize, 0);
        AddBaseSkin("mob", "Mobs", BaseCellSize, 1);
        AddBaseSkin("buttons", "StartButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 0);           //0
        AddBaseSkin("buttons", "ExitButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 0);            //1
        AddBaseSkin("buttons", "BacktButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 0);           //2
        AddBaseSkin("buttons", "AttackMoveButton", new Size(ImgArr["Assets/ExitButton.png"].width / 8, ImgArr["Assets/ExitButton.png"].height / 8), 0);      //3
        AddBaseSkin("buttons", "OptionButton", new Size(ImgArr["Assets/OptionButton.png"].width / 8, ImgArr["Assets/OptionButton.png"].height / 8), 0);      //4
        AddBaseSkin("buttons", "NextButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 0);            //5
        AddBaseSkin("buttons", "StartButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 1);           //6
        AddBaseSkin("buttons", "MagicButton", new Size(ImgArr["Assets/ExitButton.png"].width / 6, ImgArr["Assets/ExitButton.png"].height / 6), 0);           //7
        func(BaseSpritesArr);
    }

}

