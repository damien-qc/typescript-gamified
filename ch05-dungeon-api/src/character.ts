import { Utils } from './utils';

export abstract class Character {
  hp: number;
  damage: number;
  name: string;
  static maxHp: number = 100;

  constructor(hp: number, damage: number, name: string) {
    this.hp = Math.min(hp, Character.maxHp);
    this.damage = damage;
    this.name = name;
  }

  get alive(): boolean {
    return this.hp > 0;
  }

  attack(character: Character): void {
    if (this.alive && Utils.getRandomNumber(1, 10) > 2) {
      character.hp -= this.damage;
    }
  }
}
