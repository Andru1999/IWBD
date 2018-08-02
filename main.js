window.onload = () => {
    function eval_after_load_resurses(SpriteArr){
        game = new Game();
        let gui = new GUI(game, SpriteArr);
        new AnimationLoop( (dt) => {
            gui.updateGui(dt);
            gui.render();
        }).start();

    }
    loadBaseResurses(eval_after_load_resurses);
};