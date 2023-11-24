"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const utils_1 = require("./utils");
class Character {
    constructor(hp, damage, name) {
        this.hp = Math.min(hp, Character.maxHp);
        this.damage = damage;
        this.name = name;
    }
    get alive() {
        return this.hp > 0;
    }
    attack(character) {
        if (this.alive && utils_1.Utils.getRandomNumber(1, 10) > 2) {
            character.hp -= this.damage;
        }
    }
}
exports.Character = Character;
Character.maxHp = 100;
