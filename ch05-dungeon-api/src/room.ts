import { Player } from './player';
import { Utils } from './utils';
import { Ennemy, Bandit, Rat, Troll } from './ennemy';

export type Direction = 'North' | 'East' | 'South' | 'West';
const directions: Direction[] = ['North', 'East', 'South', 'West'];

export abstract class Room {
  id: number;
  doors: { roomId: number; direction: Direction }[] = [];
  hasEnnemy: boolean = false;

  constructor(id: number) {
    this.id = id;
  }

  enter(player: Player): string {
    player.currentRoomId = this.id;
    return `You entered room #${this.id.toString().padStart(2, '0')}. `;
  }

  protected describeDoors(): string {
    let message = `You see ${this.doors.length} ${
      this.doors.length > 1 ? 'doors' : 'door'
    } located `;

    if (this.doors.length <= 2) {
      message += this.doors.map((d) => d.direction).join(' and ');
    } else {
      const doors = this.doors
        .slice(0, this.doors.length - 1)
        .map((d) => d.direction)
        .join(', ');
      const lastId = this.doors.length - 1;
      message += doors + `, and ${this.doors[lastId].direction}`;
    }
    return message + '. ';
  }

  getRoomId(doorDirection: Direction): number | undefined {
    const door = this.doors.find((d) => d.direction === doorDirection);
    return door?.roomId;
  }

  connect(room: Room): void {
    const dir: Direction = this.getRandomDirection();
    this.doors.push({ roomId: room.id, direction: dir });
    room.doors.push({
      roomId: this.id,
      direction: this.getOppositeDirection(dir)
    });
  }

  private getRandomDirection(): Direction {
    const usedDirections = this.doors.map((d) => d.direction);
    const availableDirections = directions.filter(
      (d) => usedDirections.indexOf(d) < 0
    );
    return Utils.getRandomItem(availableDirections);
  }

  private getOppositeDirection(direction: Direction): Direction {
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

export class EmptyRoom extends Room {
  override enter(player: Player): string {
    let message = super.enter(player);
    message += 'The room is empty. ';
    message += this.describeDoors();

    return message;
  }
}

export class SpikesRoom extends Room {
  damage: number;

  constructor(id: number) {
    super(id);
    this.damage = Utils.getRandomItem([10, 20, 50, 80]);
  }

  override enter(player: Player): string {
    player.hp -= this.damage;

    let message = super.enter(player);
    message += `You stepped on spikes and took ${this.damage} damage. `;
    if (player.alive) {
      message += this.describeDoors();
    }
    return message;
  }
}

export class HealingPotionRoom extends Room {
  restoration: number;
  used: boolean = false;

  constructor(id: number) {
    super(id);
    this.restoration = Utils.getRandomItem([10, 20, 50, 80]);
  }

  override enter(player: Player): string {
    let message = super.enter(player);
    if (!this.used) {
      player.hp += this.restoration;
      player.hp = Math.min(player.hp, Player.maxHp);
      this.used = true;
      message += `You found a healing potion, you have ${player.hp} hp left. `;
    } else {
      message += 'You already used this potion. ';
    }

    message += this.describeDoors();
    return message;
  }
}

export class TreasureRoom extends Room {
  override enter(player: Player): string {
    player.treasureFound = true;
    let message = super.enter(player);
    message += 'You found the treasure! ';
    return message;
  }
}

export class SwordRoom extends Room {
  bonusDamage: number;
  used: boolean = false;

  constructor(id: number) {
    super(id);
    this.bonusDamage = Utils.getRandomItem([10, 20, 30]);
  }

  override enter(player: Player): string {
    let message = super.enter(player);
    if (!this.used) {
      player.damage += this.bonusDamage;
      this.used = true;
      message += `You found a sword! Your damage is now ${player.damage}.  \n`;
    } else {
      message += 'This room is empty.  \n';
    }

    message += this.describeDoors();
    return message;
  }
}

export class EnnemyRoom extends Room {
  ennemy: Ennemy;
  visited: boolean;

  constructor(id: number) {
    super(id);
    this.ennemy = this.createRandomEnnemy();
    this.visited = false;
  }

  override enter(player: Player): string {
    let message = super.enter(player);
    if (this.visited) {
      message += `A dead ${this.ennemy.type} lies at your feet! \n`;
      message += this.describeDoors();
    } else {
      this.ennemy.fight(player);
      this.visited = true;
      if (player.alive) {
        message += `You killed the ${this.ennemy.type}!  \n`;
      } else {
        message += `You were killed by ${this.ennemy.type}!  \n`;
      }
    }
    return message;
  }

  private createRandomEnnemy(): Ennemy {
    const distributionEnnemyType = [
      ...Array(7).fill('rat'),
      ...Array(3).fill('bandit'),
      ...Array(1).fill('troll')
    ];
    const ennemyType = Utils.getRandomItem(distributionEnnemyType);
    switch (ennemyType) {
      case 'bandit':
        return new Bandit();
      case 'troll':
        return new Troll();
      default:
        return new Rat();
    }
  }
}
