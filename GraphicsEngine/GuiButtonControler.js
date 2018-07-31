class ButtonControler {
    constructor() {
        this.buttons = {};
    }

    switchButtons(buttons) {
        this.buttons = buttons;
    }

    checkButtons(x, y) {
        let k = false;
        for (var button of this.buttons) {
            k = k || button.detect(x, y);
        }
        return k;
    }
}
