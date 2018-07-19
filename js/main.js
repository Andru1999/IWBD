$(document).ready(() => {
    $('iframe#start_menu').contents().find('#start_game').click(function (el) {
        $('iframe#start_menu').hide();
        $('iframe#game').show();
    });
});