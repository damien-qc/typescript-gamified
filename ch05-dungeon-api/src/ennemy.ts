import { Player } from './player';
import { Character } from './character';

type EnnemyType = 'rat' | 'bandit' | 'troll';
export abstract class Ennemy extends Character {
  static maxDamage: number;
  type!: EnnemyType;

  fight(player: Player) {
    while (player.alive && this.alive) {
      player.attack(this);
      this.attack(player);
    }
  }

  describe(): string {
    let message = `You see ${this.type}`;
    if (this.alive) {
      message += ` with ${this.hp} HP`;
    } else {
      message += ` it's dead`!;
    }
    return message + '. \n';
  }
}

export class Bandit extends Ennemy {
  type: EnnemyType = 'bandit';

  constructor() {
    super(20, 10, 'bandit');
  }
}

export class Troll extends Ennemy {
  type: EnnemyType = 'troll';
  constructor() {
    super(30, 15, 'bandit');
  }
}

export class Rat extends Ennemy {
  type: EnnemyType = 'rat';
  constructor() {
    super(5, 3, 'rat');
  }
}
