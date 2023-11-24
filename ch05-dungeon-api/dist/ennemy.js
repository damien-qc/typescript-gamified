"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rat = exports.Troll = exports.Bandit = exports.Ennemy = void 0;
const character_1 = require("./character");
class Ennemy extends character_1.Character {
    fight(player) {
        while (player.alive && this.alive) {
            player.attack(this);
            this.attack(player);
        }
    }
    describe() {
        let message = `You see ${this.type}`;
        if (this.alive) {
            message += ` with ${this.hp} HP`;
        }
        else {
            message += ` it's dead`;
        }
        return message + '. \n';
    }
}
exports.Ennemy = Ennemy;
class Bandit extends Ennemy {
    constructor() {
        super(20, 10, 'bandit');
        this.type = 'bandit';
    }
}
exports.Bandit = Bandit;
class Troll extends Ennemy {
    constructor() {
        super(30, 15, 'bandit');
        this.type = 'troll';
    }
}
exports.Troll = Troll;
class Rat extends Ennemy {
    constructor() {
        super(5, 3, 'rat');
        this.type = 'rat';
    }
}
exports.Rat = Rat;
