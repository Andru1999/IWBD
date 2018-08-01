"use strict";

function loadBaseResurses(func) {
    var Textures = {};
    var Sprites = {};
    var Images = {};
    // Почему размер клетки здесь?
    var BaseCellSize = new Size(BaseCellHeight, BaseCellWidth);
    loadImg(
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
            "Assets/dmgsprite.png"
        ], func);

    function loadImg(urlArr, func) {
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
            Images[url] = _load(url);
        });
    }


    function genTextures(func) {
        function addBaseTexture(img, dx, dy, name) {
            Textures[name] = new Texture(img, dx, dy);
        }

        addBaseTexture(Images['Assets/BlueWallAndFloor.png'], 64, 64, "BlueWalls&Floor");
        addBaseTexture(Images['Assets/GreyWallAndFloor.png'], 64, 64, "GreyWalls&Floor");
        addBaseTexture(Images['Assets/WhiteWallAndFloor.png'], 64, 64, "WhiteWalls&Floor");
        addBaseTexture(Images['Assets/Void.png'], 64, 64, "VoidTexture");
        addBaseTexture(Images['Assets/Smoke.png'], 64, 64, "Smoke");
        addBaseTexture(Images['Assets/WalkableSpace.png'], 64, 64, "WalkableSpase");
        addBaseTexture(Images['Assets/AttackSpace.png'], 64, 64, "AttakSpase");
        addBaseTexture(Images["Assets/mobs.png"], 16, 16, "Mobs");
        addBaseTexture(Images['Assets/Hero.png'], 16, 21, "Hero");
        addBaseTexture(Images["Assets/ExitButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "ExitButton");
        addBaseTexture(Images["Assets/StartButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "StartButton");
        addBaseTexture(Images["Assets/BackButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "BacktButton");
        addBaseTexture(Images["Assets/OptionButton.png"], Images["Assets/OptionButton.png"].width, Images["Assets/OptionButton.png"].height, "OptionButton");
        addBaseTexture(Images["Assets/AttackMoveButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "AttackMoveButton");
        addBaseTexture(Images["Assets/NextButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "NextButton");
        addBaseTexture(Images["Assets/MagicButton.png"], Images["Assets/ExitButton.png"].width, Images["Assets/ExitButton.png"].height, "MagicButton");
        addBaseTexture(Images["Assets/dmgsprite.png"], 39, 39, "DmgTexture");
        genSprites(func);
    }

    function genSprites(func) {
        function addBaseSkin(name, basetexture, size, framesArr) {
            if (!Sprites[name])
                Sprites[name] = [];
            Sprites[name].push(new BaseSprite(Textures[basetexture], size, framesArr));
        }

        addBaseSkin("wall", "BlueWalls&Floor", BaseCellSize, [0]);
        addBaseSkin("floor", "BlueWalls&Floor", BaseCellSize, [1]);
        addBaseSkin("wall", "GreyWalls&Floor", BaseCellSize, [0]);
        addBaseSkin("floor", "GreyWalls&Floor", BaseCellSize, [1]);
        addBaseSkin("wall", "WhiteWalls&Floor", BaseCellSize, [0]);
        addBaseSkin("floor", "WhiteWalls&Floor", BaseCellSize, [1]);
        addBaseSkin("void", "VoidTexture", BaseCellSize, [0]);
        addBaseSkin("hero", "Hero", BaseCellSize, [0]);
        addBaseSkin("hero", "Hero", BaseCellSize, [1]);
        addBaseSkin("hero", "Hero", BaseCellSize, [2]);
        addBaseSkin("hero", "Hero", BaseCellSize, [3]);
        addBaseSkin("area", "WalkableSpase", BaseCellSize, [0]);
        addBaseSkin("area", "AttakSpase", BaseCellSize, [0]);
        addBaseSkin("smoke", "Smoke", BaseCellSize, [0]);
        addBaseSkin("mob", "Mobs", BaseCellSize, [0]);
        addBaseSkin("mob", "Mobs", BaseCellSize, [1]);
        addBaseSkin("buttons", "StartButton", new Size(Images["Assets/ExitButton.png"].width / 6, Images["Assets/ExitButton.png"].height / 6), [0,1]);         //0
        addBaseSkin("buttons", "ExitButton", new Size(Images["Assets/ExitButton.png"].width / 6, Images["Assets/ExitButton.png"].height / 6), [0]);            //1
        addBaseSkin("buttons", "BacktButton", new Size(Images["Assets/ExitButton.png"].width / 6, Images["Assets/ExitButton.png"].height / 6), [0]);           //2
        addBaseSkin("buttons", "AttackMoveButton", new Size(Images["Assets/ExitButton.png"].width / 8, Images["Assets/ExitButton.png"].height / 8), [0,1]);    //3
        addBaseSkin("buttons", "OptionButton", new Size(Images["Assets/OptionButton.png"].width / 8, Images["Assets/OptionButton.png"].height / 8), [0]);      //4
        addBaseSkin("buttons", "NextButton", new Size(Images["Assets/ExitButton.png"].width / 8, Images["Assets/ExitButton.png"].height / 8), [0]);            //5
        addBaseSkin("buttons", "MagicButton", new Size(Images["Assets/ExitButton.png"].width / 8, Images["Assets/ExitButton.png"].height / 8), [0]);           //6
        addBaseSkin("dmg", "DmgTexture", BaseCellSize, [0,1,2,3,4,5,6,7,8,9,10,11,12]);           //6
        func(Sprites);
    }

}

