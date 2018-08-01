"use strict";

function LoadBaseResurses(func) {
    var Textures = {};
    var Sprites = {};
    var Imgs = {};
    // Почему размер клетки здесь?
    var BaseCellSize = new Size(BaseCellHeight, BaseCellWidth);

    LoadImg([
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
        "Assets/NextButton.png",
    ], func);

    function LoadImg(urlArr, func) {
        let SothigToFixAJAX = urlArr.length;

        function _load(url) {

            let img = new Image();
            img.onload = function () {
                SothigToFixAJAX--;
                if (SothigToFixAJAX === 0) {
                    genTextures(func);
                }
            };
            img.src = url;
            return img;
        }

        urlArr.forEach(function (url) {
            Imgs[url] = _load(url);
        });
    }


    function genTextures(func) {
        function AddBaseTexture(img, dx, dy, name) {
            Textures[name] = new Texture(img, dx, dy);
        }

        AddBaseTexture(Imgs['Assets/BlueWallAndFloor.png'], 64, 64, "BlueWalls&Floor");
        AddBaseTexture(Imgs['Assets/GreyWallAndFloor.png'], 64, 64, "GreyWalls&Floor");
        AddBaseTexture(Imgs['Assets/WhiteWallAndFloor.png'], 64, 64, "WhiteWalls&Floor");
        AddBaseTexture(Imgs['Assets/Void.png'], 64, 64, "VoidTexture");
        AddBaseTexture(Imgs['Assets/Smoke.png'], 64, 64, "Smoke");
        AddBaseTexture(Imgs['Assets/WalkableSpace.png'], 64, 64, "WalkableSpase");
        AddBaseTexture(Imgs['Assets/AttackSpace.png'], 64, 64, "AttakSpase");
        AddBaseTexture(Imgs['Assets/Hero.png'], 16, 21, "Hero");
        AddBaseTexture(Imgs["Assets/ExitButton.png"], Imgs["Assets/ExitButton.png"].width, Imgs["Assets/ExitButton.png"].height, "ExitButton");
        AddBaseTexture(Imgs["Assets/StartButton.png"], Imgs["Assets/ExitButton.png"].width, Imgs["Assets/ExitButton.png"].height, "StartButton");
        AddBaseTexture(Imgs["Assets/BackButton.png"], Imgs["Assets/ExitButton.png"].width, Imgs["Assets/ExitButton.png"].height, "BacktButton");
        AddBaseTexture(Imgs["Assets/OptionButton.png"], Imgs["Assets/OptionButton.png"].width, Imgs["Assets/OptionButton.png"].height, "OptionButton");
        AddBaseTexture(Imgs["Assets/AttackMoveButton.png"], Imgs["Assets/ExitButton.png"].width, Imgs["Assets/ExitButton.png"].height, "AttackMoveButton");
        AddBaseTexture(Imgs["Assets/NextButton.png"], Imgs["Assets/ExitButton.png"].width, Imgs["Assets/ExitButton.png"].height, "NextButton");
        genBaseSprites(func);
    }

    function genBaseSprites(func) {
        function addBaseSkin(name, basetexture, size, index) {
            if (!Sprites[name])
                Sprites[name] = [];
            Sprites[name].push(
                new BaseSprite(Textures[basetexture], size, index));
        }

        addBaseSkin("wall", "BlueWalls&Floor", BaseCellSize, 0);
        addBaseSkin("floor", "BlueWalls&Floor", BaseCellSize, 1);
        addBaseSkin("wall", "GreyWalls&Floor", BaseCellSize, 0);
        addBaseSkin("floor", "GreyWalls&Floor", BaseCellSize, 1);
        addBaseSkin("wall", "WhiteWalls&Floor", BaseCellSize, 0);
        addBaseSkin("floor", "WhiteWalls&Floor", BaseCellSize, 1);
        addBaseSkin("void", "VoidTexture", BaseCellSize, 0);
        addBaseSkin("hero", "Hero", BaseCellSize, 0);
        addBaseSkin("area", "WalkableSpase", BaseCellSize, 0);
        addBaseSkin("area", "AttakSpase", BaseCellSize, 0);
        addBaseSkin("smoke", "Smoke", BaseCellSize, 0);
        addBaseSkin("buttons", "StartButton", new Size(Imgs["Assets/ExitButton.png"].width / 6, Imgs["Assets/ExitButton.png"].height / 6), 0);           //0
        addBaseSkin("buttons", "ExitButton", new Size(Imgs["Assets/ExitButton.png"].width / 6, Imgs["Assets/ExitButton.png"].height / 6), 0);          //1
        addBaseSkin("buttons", "BacktButton", new Size(Imgs["Assets/ExitButton.png"].width / 6, Imgs["Assets/ExitButton.png"].height / 6), 0);         //2
        addBaseSkin("buttons", "AttackMoveButton", new Size(Imgs["Assets/ExitButton.png"].width / 8, Imgs["Assets/ExitButton.png"].height / 8), 0);    //3
        addBaseSkin("buttons", "OptionButton", new Size(Imgs["Assets/OptionButton.png"].width / 8, Imgs["Assets/OptionButton.png"].height / 8), 0);     //4
        addBaseSkin("buttons", "NextButton", new Size(Imgs["Assets/ExitButton.png"].width / 6, Imgs["Assets/ExitButton.png"].height / 6), 0);           //5
        func(Sprites);
    }

}

