"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const character_1 = require("./character");
class Player extends character_1.Character {
    constructor(hp, damage, name) {
        super(hp, damage, name);
        this.currentRoomId = 0;
        this.treasureFound = false;
    }
    describe() {
        return `You have ${this.hp} HP. \n`;
    }
}
exports.Player = Player;
