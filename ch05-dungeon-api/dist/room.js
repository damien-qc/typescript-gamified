"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnnemyRoom = exports.SwordRoom = exports.TreasureRoom = exports.HealingPotionRoom = exports.SpikesRoom = exports.EmptyRoom = exports.Room = void 0;
const player_1 = require("./player");
const utils_1 = require("./utils");
const ennemy_1 = require("./ennemy");
const directions = ['North', 'East', 'South', 'West'];
class Room {
    constructor(id) {
        this.doors = [];
        this.hasEnnemy = false;
        this.id = id;
    }
    enter(player) {
        player.currentRoomId = this.id;
        return `You entered room #${this.id.toString().padStart(2, '0')}. `;
    }
    describeDoors() {
        let message = `You see ${this.doors.length} ${this.doors.length > 1 ? 'doors' : 'door'} located `;
        if (this.doors.length <= 2) {
            message += this.doors.map((d) => d.direction).join(' and ');
        }
        else {
            const doors = this.doors
                .slice(0, this.doors.length - 1)
                .map((d) => d.direction)
                .join(', ');
            const lastId = this.doors.length - 1;
            message += doors + `, and ${this.doors[lastId].direction}`;
        }
        return message + '. ';
    }
    getRoomId(doorDirection) {
        const door = this.doors.find((d) => d.direction === doorDirection);
        return door === null || door === void 0 ? void 0 : door.roomId;
    }
    connect(room) {
        const dir = this.getRandomDirection();
        this.doors.push({ roomId: room.id, direction: dir });
        room.doors.push({
            roomId: this.id,
            direction: this.getOppositeDirection(dir)
        });
    }
    getRandomDirection() {
        const usedDirections = this.doors.map((d) => d.direction);
        const availableDirections = directions.filter((d) => usedDirections.indexOf(d) < 0);
        return utils_1.Utils.getRandomItem(availableDirections);
    }
    getOppositeDirection(direction) {
        switch (direction) {
            case 'North':
                return 'South';
            case 'South':
                return 'North';
            case 'East':
                return 'West';
            case 'West':
                return 'East';
        }
    }
}
exports.Room = Room;
class EmptyRoom extends Room {
    enter(player) {
        let message = super.enter(player);
        message += 'The room is empty. ';
        message += this.describeDoors();
        return message;
    }
}
exports.EmptyRoom = EmptyRoom;
class SpikesRoom extends Room {
    constructor(id) {
        super(id);
        this.damage = utils_1.Utils.getRandomItem([10, 20, 50, 80]);
    }
    enter(player) {
        player.hp -= this.damage;
        let message = super.enter(player);
        message += `You stepped on spikes and took ${this.damage} damage. `;
        if (player.alive) {
            message += this.describeDoors();
        }
        return message;
    }
}
exports.SpikesRoom = SpikesRoom;
class HealingPotionRoom extends Room {
    constructor(id) {
        super(id);
        this.used = false;
        this.restoration = utils_1.Utils.getRandomItem([10, 20, 50, 80]);
    }
    enter(player) {
        let message = super.enter(player);
        if (!this.used) {
            player.hp += this.restoration;
            player.hp = Math.min(player.hp, player_1.Player.maxHp);
            this.used = true;
            message += `You found a healing potion, you have ${player.hp} hp left. `;
        }
        else {
            message += 'You already used this potion. ';
        }
        message += this.describeDoors();
        return message;
    }
}
exports.HealingPotionRoom = HealingPotionRoom;
class TreasureRoom extends Room {
    enter(player) {
        player.treasureFound = true;
        let message = super.enter(player);
        message += 'You found the treasure! ';
        return message;
    }
}
exports.TreasureRoom = TreasureRoom;
class SwordRoom extends Room {
    constructor(id) {
        super(id);
        this.used = false;
        this.bonusDamage = utils_1.Utils.getRandomItem([10, 20, 30]);
    }
    enter(player) {
        let message = super.enter(player);
        if (!this.used) {
            player.damage += this.bonusDamage;
            this.used = true;
            message += `You found a sword! Your damage is now ${player.damage}.  \n`;
        }
        else {
            message += 'This room is empty.  \n';
        }
        message += this.describeDoors();
        return message;
    }
}
exports.SwordRoom = SwordRoom;
class EnnemyRoom extends Room {
    constructor(id) {
        super(id);
        this.ennemy = this.createRandomEnnemy();
        this.visited = false;
    }
    enter(player) {
        let message = super.enter(player);
        if (this.visited) {
            message += `A dead ${this.ennemy.type} lies at your feet! \n`;
            message += this.describeDoors();
        }
        else {
            this.ennemy.fight(player);
            this.visited = true;
            if (player.alive) {
                message += `You killed the ${this.ennemy.type}!  \n`;
            }
            else {
                message += `You were killed by ${this.ennemy.type}!  \n`;
            }
        }
        return message;
    }
    createRandomEnnemy() {
        const distributionEnnemyType = [
            ...Array(7).fill('rat'),
            ...Array(3).fill('bandit'),
            ...Array(1).fill('troll')
        ];
        const ennemyType = utils_1.Utils.getRandomItem(distributionEnnemyType);
        switch (ennemyType) {
            case 'bandit':
                return new ennemy_1.Bandit();
            case 'troll':
                return new ennemy_1.Troll();
            default:
                return new ennemy_1.Rat();
        }
    }
}
exports.EnnemyRoom = EnnemyRoom;
