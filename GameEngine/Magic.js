"use strict";

// JavaScript source code

var selfHeal = function selfHeal(game) {
    game._currentCreature._hitPoint += game._currentCreature._strength / 10;
    game._currentCreature._mannaPoints--;
    game._animations.pushAnim("heal",0,game._currentCreature._position.x,
        game._currentCreature._position.y);
}

var extraActionPoints = function extraActionPoints(game) {
    game._currentCreature._actionPoints += 1;
    game._currentCreature._mannaPoints--;
    game._animations.pushAnim("boost",0,game._currentCreature._position.x,
                                        game._currentCreature._position.y);
}

var massHeal = function massHeal(game) {
    for (elem of game._world._units[game._currentTeam]) {
        elem._hitPoint += game._currentCreature._intelligence / 10;
        game._animations.pushAnim("heal",0,elem._position.x,elem._position.y);
    }
    game._currentCreature._mannaPoints--;
}

function hurricane(game) {
    for (let x = game._currentCreature._position.x - 1;
         x <= currentCreature._position.x + 1; x++)
        for (let y = game._currentCreature._position.y - 1;
             y <= currentCreature._position.y + 1; y++) {
            if (game._world._map._cells[x][y][2] && game._world._map._cells[x][y][2]._hitPoint){
                game._world._map._cells[x][y][2]._hitPoint-=(game._currentCreature._strength/100+1)
                                                            *game._currentCreature._baseDamage;
                game._animations.pushAnim("hurricane",0,x,y);
            }
        }
    game._currentCreature._mannaPoints--;
}

