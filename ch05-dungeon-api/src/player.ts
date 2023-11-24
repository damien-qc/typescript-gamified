import { Character } from './character';

export class Player extends Character {
  currentRoomId: number = 0;
  treasureFound: boolean = false;

  constructor(hp: number, damage: number, name: string) {
    super(hp, damage, name);
  }

  describe() {
    return `You have ${this.hp} HP. \n`;
  }
}
