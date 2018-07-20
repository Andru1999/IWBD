function preLoad() {
    readyCallbacks.push(MakeTextures);
    readyCallbacks.push(Start);
    LoadResources([
        'Assets/BlueWallAndFloor.png',
        'Assets/GreyWallAndFloor.png',
        'Assets/WhiteWallAndFloor.png',
        "Assets/Void.png",
        "Assets/Hero.png"
    ]);
}

class Game {
    init() {
        this.render
        preLoad();
    }

    run() {

    }

    free() {

    }
}

function main() {
    let game = new Game();
    game.init();
    game.run();
    game.free();
}

